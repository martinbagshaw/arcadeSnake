import React from 'react';

const StartBtn = (props) => {

    return (
        <div className="container start">
            <button onClick={() => props.onClick(props.running)} className='StartBtn'>Start</button>
        </div>
    )

}

export default StartBtn;



