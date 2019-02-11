import React from 'react';

// get the props from the parent component's state
const DirectionBtns = props => {
    
    const { rotation } = props.data;

    const style = {
        transform: `rotate(${rotation}deg)`
    }
    
    const directions = ['Up', 'Down', 'Left', 'Right'];
    const buttons = directions.map((item, index) => {
        const btnClass = `dir-button ${item}`;
        return <div className={btnClass} onClick={props.dirBtns} key={index}>{item}</div>
    })

    return (
        <div className="d-pad">
            <div className="dir-btns">{buttons}</div>
            <div className="direction" style={style}></div>
        </div>
    )
}

export default DirectionBtns;