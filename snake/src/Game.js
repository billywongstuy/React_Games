import React, {Component} from 'react';
import './Game.css';
import * as Deque from 'double-ended-queue';

//different values: H (head), B (body), F (fruit), null (empty)
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height
        }
    }

    renderSquare(rowNum, squareNum) {
        /*
        var className = 'square';

        for (var i = 0; i < this.props.bodyParts.length; i++) {
            if (rowNum === this.props.bodyParts[i][0] && squareNum === this.props.bodyParts[i][1]) {
                if (i == 0) {
                    this.props.bodyParts.pop(i);
                    return (
                        <div className="square head"></div>
                    );
                }
                else {
                    return (
                        <div className="square tail"></div>
                    );
                }
            }
        }
        */
        /*
        if (this.state.filledSquares.contains(rowNum+','+squareNum)) {
            return <div className={this.state.filledSquares[rowNum+','+squareNum]}>/div>
        }
        */

        const filledSquares = {};
        for (var i = 0; i < this.props.bodyParts.length; i++) {
            filledSquares[this.props.bodyParts.get(i).join(',')] = (i === 0) ? 'square head' : 'square tail';
        }
        if (this.props.appleLocation) {
            filledSquares[this.props.appleLocation.join(',')] = 'square apple';
        }

        const key = rowNum + ',' + squareNum;
        if (filledSquares.hasOwnProperty(key)) {
            return <div className={filledSquares[key]}></div>
        }

        return (
            <div className="square"></div>
        );
    }

    renderRow(rowNum) {
        const arr = [];
        for (var i = 0; i < this.props.width; i++) {
            arr.push(
                <td key={i}>
                    {this.renderSquare(rowNum, i)}
                </td>
            )
        }
        return arr;
    }


    render() {
        const tablebody = ((arr) => {
            for (var i = 0; i < this.props.height; i++) {
                arr.push(
                    <tr key={i}>
                        {this.renderRow(i)}
                    </tr>
                );
            }
            return arr;
        })([]);

        return (
            <table>
                <tbody>
                    {tablebody}
                </tbody>
            </table>
        )

    }

}

class Game extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.runTurn = this.runTurn.bind(this);
        this.generateApple = this.generateApple.bind(this);
        this.moveSnake = this.moveSnake.bind(this);
        this.handleInteractions = this.handleInteractions.bind(this);

        const intervalId = setInterval(this.runTurn, 500);
        this.state = {
            isPlaying: false,
            bodyParts: new Deque([[5,5], [5,4], [5,3]]),
            tailEndCache: null,
            direction: null,
            appleLocation: null,
            intervalId: intervalId
        };
        console.log(this.state);
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {

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

            this.setState(
                {
                    direction: direction,
                    isPlaying: true
                }
            )
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
            //get all the open spaces
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
        if (this.state.isPlaying) {
            const bodyParts = new Deque(this.state.bodyParts.toArray());
            const head = bodyParts.get(0);

            if (head[0] < 0 || head[0] >= this.props.height || head[1] < 0 || head[1] >= this.props.width) {
                this.setState({
                    isPlaying: false,
                    direction: null
                });
                alert('Game over!');
            }

            if (this.state.direction === 'U') {
                //head[0] -= 1;
                bodyParts.unshift([head[0] - 1, head[1]]);
            }
            if (this.state.direction === 'D') {
                //head[0] += 1;
                bodyParts.unshift([head[0] + 1, head[1]]);
            }
            if (this.state.direction === 'L') {
                bodyParts.unshift([head[0], head[1] - 1]);
                //head[1] -= 1;
            }
            if (this.state.direction === 'R') {
                bodyParts.unshift([head[0], head[1] + 1]);
                //head[1] += 1;
            }
            const tailEndCache = bodyParts.pop(); //don't pop if ate a fruit???

            //lag issues - possibly replace with my own data structure - deque
            //write iterator and everything

            //move the tail - move each part to the one before it? aka pop the last one, add new one in front?

            this.setState({
                bodyParts: bodyParts,
                tailEndCache: tailEndCache
            })
        }
    }

    handleInteractions() {
        const bodyParts = new Deque(this.state.bodyParts.toArray());
        const head = bodyParts.get(0);
        const appleLocation = this.state.appleLocation;

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
