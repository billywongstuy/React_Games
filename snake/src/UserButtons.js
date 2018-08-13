import React, {Component} from 'react';
//import './Game.css'

class UserButtons extends Component {
    render() {
        return (
            <button type='button' onClick={() => this.props.onClick()} disabled={this.props.isPlaying}>
                RESET
            </button>
        );
    }
}

export default UserButtons;
