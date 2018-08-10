import React, {Component} from 'react';
import './Game.css';

//different values: H (head), B (body), F (fruit), null (empty)
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            data: this.props.data
        }
    }

    renderSquare(squareData) {
        var className = 'square';
        if (squareData === 'H') {
            className += ' headcell';
        }
        else {
            className += ' empty'
        }

        return (
            <div className={className}></div>
        );
    }

    renderRow(rowData, rowNum) {
        return rowData.map((squareData, squareNum) => {

            //change this to depend on value (the whole td part)?
            return (
                <td key={squareNum}>
                    {this.renderSquare(squareData)}
                </td>
            )
        });
    }

    render() {
        const data = this.state.data.slice();

        //Should I change how it's rendered?
        //Currently, it's based on data, which I have to update all the time
        //Maybe just render each square normally, then add classes to each of the head and body?
        const tablebody = data.map((rowData, rowNum) => {
            return (
                <tr key={rowNum}>
                    {this.renderRow(rowData, rowNum)}
                </tr>
            )
        })

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
        this.moveSnake = this.moveSnake.bind(this);

        const dataArray = new Array(this.props.height);
        for (var i = 0; i < this.props.height; i++) {
            dataArray[i] = new Array(this.props.width).fill(null);
        }
        const intervalId = setInterval(this.moveSnake, 500);
        this.state = {
            data: dataArray,
            isPlaying: false,
            head: [5,5],
            bodyParts: [],
            direction: null,
            intervalId: intervalId
        };
        this.state.data[5][5] = 'H';
    }

    handleKeyDown(event) {
        console.log(event.key);
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {

            console.log("directional " + this.state.direction);

            const directions = {'ArrowUp': 'U', 'ArrowDown': 'D', 'ArrowLeft': 'L', 'ArrowRight': 'R'};
            this.setState(
                {
                    direction: directions[event.key],
                    isPlaying: true
                }
            )

        }
        /*
        switch(event.key) {
            case 'ArrowUp':
                console.log('UP');
                break;
            case 'ArrowDown':
                console.log('DOWN');
                break;
            case 'ArrowLeft':
                break;
            case 'ArrowRight':
                break;
            default:
                break;
        }
        */
    }


    moveSnake() {
        if (this.state.isPlaying) {
            const dataCopy = this.state.data.slice();
            const head = this.state.head.slice();

            //need to check for edge cases, aka game over
            //also check for eating itself later
            if (head[0] <= 0 || head[0] >= this.props.height || head[1] <= 0 || head[1] >= this.props.width) {
                this.setState({
                    isPlaying: false,
                    direction: null
                });
                alert('Game over!');
            }


            dataCopy[head[0]][head[1]] = null;
            if (this.state.direction === 'U') {
                head[0] -= 1;
                dataCopy[head[0]][head[1]] = 'H';
            }
            if (this.state.direction === 'D') {
                head[0] += 1;
                dataCopy[head[0]][head[1]] = 'H';
            }
            if (this.state.direction === 'L') {
                head[1] -= 1;
                dataCopy[head[0]][head[1]] = 'H';
            }
            if (this.state.direction === 'R') {
                head[1] += 1;
                dataCopy[head[0]][head[1]] = 'H';
            }



            this.setState({
                data: dataCopy,
                head: head
            })
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        //var intervalId = setInterval(this.timer, 1000);
    }

    render() {
        return (
            <div>
                <div>Hello</div>
                <Board width={this.props.width} height={this.props.height} data={this.state.data}/>
            </div>
        );
    }

}

export default Game;
