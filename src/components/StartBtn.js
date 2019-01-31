import React from 'react';

const StartBtn = ({ running, onClick }) => {

    return (
        <button onClick={() => onClick(running)} className='StartBtn'>Start</button>
    )

}

export default StartBtn;



