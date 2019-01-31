import React from 'react';

const StartBtn = (props) => {

    return (
        <button onClick={() => props.onClick(props.running)} className='StartBtn'>Start</button>
    )

}

export default StartBtn;



