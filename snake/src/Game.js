import React, {Component} from 'react';
import Board from './Board';
import UserButtons from './UserButtons';
import './Game.css'
import * as Deque from 'double-ended-queue';


class Game extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.runTurn = this.runTurn.bind(this);
        this.generateApple = this.generateApple.bind(this);
        this.moveSnake = this.moveSnake.bind(this);
        this.handleInteractions = this.handleInteractions.bind(this);

        const intervalId = setInterval(this.runTurn, 300);
        this.state = {
            isPlaying: false, //keeps track of whether the game is in progress
            score: 0, //keeps track of game score
            bodyParts: new Deque([[5,5], [5,4], [5,3]]), //contains the locations for head and all the tail parts of the snake (needs to initially be randomized in straight line)
            tailEndCache: null, //the previous end of the tail for the snake before moving, used for adding on tail parts
            direction: null, //the direction that the snake is traveling: U, D, L, R
            appleLocation: null, //location of the apple in the board
            intervalId: intervalId, //not currently in use - maybe for debug purposes or additional featurs in the future
            inputLocked: false //to prevent multiple inputs in quick succession
        };
    }

    handleKeyDown(event) {
        if (!this.state.inputLocked && (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            var direction = this.state.direction;
            if (event.key === 'ArrowUp' && this.state.direction !== 'D') {
                direction = 'U';
            }
            if (event.key === 'ArrowDown' && this.state.direction !== 'U') {
                direction = 'D';
            }
            if (event.key === 'ArrowLeft' && this.state.direction !== 'R') {
                direction = 'L';
            }
            if (event.key === 'ArrowRight' && this.state.direction !== 'L') {
                direction = 'R';
            }

            this.setState({
                direction: direction,
                isPlaying: true,
                inputLocked: true
            });
        }
    }

    runTurn() {
        this.generateApple(); //find better way should not have to constantly make it run
        if (this.state.isPlaying) {
            this.moveSnake();
            this.handleInteractions();
        }
    }

    generateApple() {
        if (this.state.appleLocation === null) {
            console.log("generateApple");
            const openSpaces = [];
            const filledSquares = {};
            var i;
            for (i = 0; i < this.state.bodyParts.length; i++) {
                filledSquares[this.state.bodyParts.get(i).join(',')] = true;
            }
            for (i = 0; i < this.props.height; i++) {
                for (var j = 0; j < this.props.width; j++) {
                    if (!filledSquares.hasOwnProperty(i + ',' + j)) {
                        openSpaces.push(i + ',' + j);
                    }
                }
            }
            const chosenAppleLocation = openSpaces[Math.floor(Math.random()*openSpaces.length)].split(',').map(Number);
            this.setState({appleLocation: chosenAppleLocation});
        }
    }

    moveSnake() {
        const bodyParts = new Deque(this.state.bodyParts.toArray());
        const head = bodyParts.get(0);

        if (this.state.direction === 'U') {
            bodyParts.unshift([head[0] - 1, head[1]]);
        }
        if (this.state.direction === 'D') {
            bodyParts.unshift([head[0] + 1, head[1]]);
        }
        if (this.state.direction === 'L') {
            bodyParts.unshift([head[0], head[1] - 1]);
        }
        if (this.state.direction === 'R') {
            bodyParts.unshift([head[0], head[1] + 1]);
        }
        const tailEndCache = bodyParts.pop();

        this.setState({
            bodyParts: bodyParts,
            tailEndCache: tailEndCache,
            inputLocked: false
        });
    }

    handleInteractions() {
        const bodyParts = new Deque(this.state.bodyParts.toArray());
        const head = bodyParts.get(0);
        const appleLocation = this.state.appleLocation;

        if (head[0] < 0 || head[0] >= this.props.height || head[1] < 0 || head[1] >= this.props.width) {
            this.setState({
                isPlaying: false,
                direction: null
            });
            alert('Game over!');
            return;
        }

        //combine with above maybe?
        for (var i = 1; i < bodyParts.length; i++) {
            if (head[0] === bodyParts[i][0] && head[1] === bodyParts[i][1]) {
                this.setState({
                    isPlaying: false,
                    direction: null
                });
                alert('Game over!');
                return;
            }
        }

        if (head[0] === appleLocation[0] && head[1] === appleLocation[1]) {
            this.setState({appleLocation: null, score: this.state.score + 1});
            this.generateApple();
            this.forceUpdate(); //kind of hacky
            bodyParts.push(this.state.tailEndCache);
            this.setState({bodyParts: bodyParts});
        }
    }

    resetGame() {
        //maybe store this somewhere?
        this.setState({
            isPlaying: false, //keeps track of whether the game is in progress
            score: 0, //keeps track of game score
            bodyParts: new Deque([[5,5], [5,4], [5,3]]), //contains the locations for head and all the tail parts of the snake (needs to initially be randomized in straight line)
            tailEndCache: null, //the previous end of the tail for the snake before moving, used for adding on tail parts
            direction: null, //the direction that the snake is traveling: U, D, L, R
            appleLocation: null, //location of the apple in the board
            inputLocked: false //to prevent multiple inputs in quick succession
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    render() {
        //NEED PRETTIER SCORE COUNT, REPLAY BUTTON
        return (
            <div>
                <label for='score' className='scoreLabel'>Score: {this.state.score}</label>
                <Board
                    width={this.props.width}
                    height={this.props.height}
                    bodyParts={this.state.bodyParts}
                    appleLocation={this.state.appleLocation}
                />
                <UserButtons
                    onClick={() => this.resetGame()}
                    isPlaying={this.state.isPlaying}
                />
            </div>
        );
    }

}

export default Game;
