import React, {Component} from 'react';
import './Board.css';

class Board extends Component {

    renderSquare(rowNum, colNum) {
        const filledSquares = {};
        for (var i = 0; i < this.props.bodyParts.length; i++) {
            const bodyPartKey = this.props.bodyParts.get(i).join(',');
            if (!filledSquares.hasOwnProperty(bodyPartKey)) {
                filledSquares[bodyPartKey] = (i === 0) ? 'square head' : 'square tail';
            }
        }
        if (this.props.appleLocation) {
            filledSquares[this.props.appleLocation.join(',')] = 'square apple';
        }

        const squareKey = rowNum + ',' + colNum;
        if (filledSquares.hasOwnProperty(squareKey)) {
            return <div className={filledSquares[squareKey]}></div>
        }
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

export default Board;
