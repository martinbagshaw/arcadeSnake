import React from 'react';

// get the props from the parent component's state
const DirectionBtns = props => {
    
    const { rotation } = props.data;

    const style = {
        transform: `rotate(${rotation}deg)`
    }

    return (
        <div className="d-pad">
            <div className="direction" style={style}></div>
        </div>
    )
}

export default DirectionBtns;