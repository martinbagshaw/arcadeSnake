import React from 'react';

// get the props from the parent component's state
const DirectionBtns = props => {
    
    const { direction } = props.data;

    // make a function to set the style based on previous direction
    // - avoid it flipping around
    const way = `direction ${direction}`;
    
    return (
        <div className="d-pad">
            <div className={way}></div>
        </div>
    )
}

export default DirectionBtns;