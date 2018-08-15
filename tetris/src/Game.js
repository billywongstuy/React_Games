import React, {Component} from 'react';
import Board from './Board';
import './Game.css';
import {TetriminoFactory} from './Tetrimino';

//need board
//need side bar

class Game extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);

        const tetriminoFactory = new TetriminoFactory();
        this.state = {
            tetriminoFactory: tetriminoFactory,
            //droppingPiece: tetriminoFactory.getTetrimino(5,5,'S'),
            droppingPiece: tetriminoFactory.getRandomTetrimino(5,5),
            standbyPiece: null
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.key === '/') {
            //fake
            this.state.droppingPiece.move(0,-1);
            this.setState({droppingPiece: this.state.droppingPiece});
        }

        if (event.key === 'ArrowDown') {
            //not correct one
            this.state.droppingPiece.move(0,1);
            this.setState({droppingPiece: this.state.droppingPiece});
        }

        if (event.key === 'ArrowLeft') {
            this.state.droppingPiece.move(-1,0);
            this.setState({droppingPiece: this.state.droppingPiece});
        }
        if (event.key === 'ArrowRight') {
            this.state.droppingPiece.move(1,0);
            this.setState({droppingPiece: this.state.droppingPiece});
        }

        if (event.key === 'ArrowUp') {
            this.state.droppingPiece.rotateRightNinety();
            this.setState({droppingPiece: this.state.droppingPiece});
        }




    }

    render() {
        return (
            <Board
                width={this.props.width}
                height={this.props.height}
                droppingPiece={this.state.droppingPiece}
            />
        );
    }

}

export default Game;
