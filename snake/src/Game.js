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
        var className = 'empty';
        if (squareData === 'H') {
            className = 'headcell';
        }

        return (
            <div className={className}>O</div>
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


        const tablebody = data.map((rowData, rowNum) => {
            return (
                <tr key={rowNum}>
                    {this.renderRow(rowData, rowNum)}
                </tr>
            )
        })

        return (
            <table border='1px'>
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
        const dataArray = new Array(this.props.height);
        for (var i = 0; i < this.props.height; i++) {
            dataArray[i] = new Array(this.props.width).fill(null);
        }
        this.state = {
            data: dataArray
        };
        this.state.data[5][5] = 'H';
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
