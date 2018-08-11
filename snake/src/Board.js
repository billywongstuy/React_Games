import React, {Component} from 'react';
import './Board.css';
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
        const filledSquares = {};
        for (var i = 0; i < this.props.bodyParts.length; i++) {
            if (!filledSquares.hasOwnProperty(this.props.bodyParts.get(i).join(','))) {
                filledSquares[this.props.bodyParts.get(i).join(',')] = (i === 0) ? 'square head' : 'square tail';
            }
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

export default Board;
