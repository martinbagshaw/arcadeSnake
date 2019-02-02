import React from 'react';

// right hand column gif (on large screens)

const Gif = (props) => {
    const { running, overMessage } = props.data;

    // make an api call
    if (!running) {
        // console.log('not running from gif');
    }

    return (
        <div className="container gif">
            <p>use the directional keys to play</p>
            <p>snakes on a plane gif to go here, obvs ✈️</p>
        </div>
    )
}

export default Gif;