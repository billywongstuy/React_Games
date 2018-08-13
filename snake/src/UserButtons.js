import React, {Component} from 'react';
import './UserButtons.css'

class UserButtons extends Component {
    render() {
        return (
            <div className='userButtons'>
                <button type='button' className='resetButton' onClick={() => this.props.onClick()} disabled={this.props.isPlaying}>
                    Reset
                </button>
            </div>
        );
    }
}

export default UserButtons;
