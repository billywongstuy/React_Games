import React, {Component} from 'react';
//import Board from './Board';
import './Game.css'

//need board
//need side bar

class Board extends Component {
    renderSquare(rowNum, colNum) {
        return (
            <div className='square'></div>
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
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Board
                width={this.props.width}
                height={this.props.height}
            />
        );
    }

}

export default Game;
