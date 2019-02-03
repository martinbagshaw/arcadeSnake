import React from 'react';
import DirectionBtns from './DirectionBtns.js'

// right hand column gif (on large screens)
const Gif = props => {
    const { running } = props.data;

    // make an api call to get a gif
    if (!running) {
        // console.log('not running from gif');
    }

    return (
        <div className="container gif">
            <p>use the directional keys to play</p>
            {/* <p>snakes on a plane gif to go here, obvs ✈️</p> */}
            <DirectionBtns data={props.data}/>
        </div>
    )
}

export default Gif;