import React from 'react';

// get the props from the parent component's state
const DirectionBtns = props => {
    
    const { direction } = props.data;
    const way = `direction ${direction}`;
    
    return (
        <div className="d-pad">
            <div className={way}></div>
        </div>
    )
}

export default DirectionBtns;