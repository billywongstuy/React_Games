import React, {Component} from 'react';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
    }

    renderSquare(rowNum, colNum) {

        const sDict1 = {};
        for (var i = 0; i < this.props.droppingPiece.squares.length; i++) {
            sDict1[this.props.droppingPiece.squares[i].join(',')] = true;
        }

        if (sDict1.hasOwnProperty(colNum + ',' + rowNum)) {
            return <div className='square piece'></div>
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

    /*
    clicky() {
        //this.setState({a: this.state.a+1});
        this.state.s.rotateRightNinety();
        this.setState({
            s: this.state.s
        })
    }
    */

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
            <div>
            <table>
                <tbody>
                    {tablebody}
                </tbody>
            </table>
            </div>
        );
    }
}

export default Board;
