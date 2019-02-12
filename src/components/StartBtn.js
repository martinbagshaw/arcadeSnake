import React from 'react';

// game over and start button
const StartBtn = props => {

    const { running, overMessage } = props.data;

    // onClick needs to match up with onClick passed in in Board.js
    const startover = props.onClick

    if (!running) {
        return (
            <div className='start-over'>
            {!running ? overMessage : ''}
                <button onClick={() => props.onClick(startover)} className='start-btn'>Play Again ></button>
            </div>
        )
    }
    // may not need this:
    else {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }

    

}

export default StartBtn;