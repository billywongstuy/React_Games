import React, {Component} from 'react';
import Board from './Board';
//css import
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
            isPlaying: false,
            bodyParts: new Deque([[5,5], [5,4], [5,3]]), //randomize this to straight line somewhere
            tailEndCache: null,
            direction: null,
            appleLocation: null,
            intervalId: intervalId,
            inputLocked: false
        };
        console.log(this.state);
    }

    handleKeyDown(event) {
        if (!this.state.inputLocked && (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            //quick presses between non-opposite then opposite causes problems
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
        }

        //combine with above maybe?
        for (var i = 1; i < bodyParts.length; i++) {
            if (head[0] === bodyParts[i][0] && head[1] === bodyParts[i][1]) {
                this.setState({
                    isPlaying: false,
                    direction: null
                });
                alert('Game over!');
            }
        }

        if (head[0] === appleLocation[0] && head[1] === appleLocation[1]) {
            this.setState({appleLocation: null});
            this.generateApple();
            this.forceUpdate(); //kind of hacky
            //add a tail part
            bodyParts.push(this.state.tailEndCache);
            this.setState({bodyParts: bodyParts});
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <div>
                <div>Hello</div>
                <Board
                    width={this.props.width}
                    height={this.props.height}
                    bodyParts={this.state.bodyParts}
                    appleLocation={this.state.appleLocation}
                />
            </div>
        );
    }

}

export default Game;
