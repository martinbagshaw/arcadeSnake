import React from 'react';

const Apple = props => {

    const { apple, boardWidth, boardSquares } = props.data;

    // check if apple exists
    if (apple.length === 2) {

        const squareSize = boardWidth / boardSquares;
        const style =  {
            left: `${apple[0] * squareSize}vw`,
            bottom: `${apple[1] * squareSize}vw`,
            width: `${squareSize}vw`,
            height: `${squareSize}vw`,
        }

        return <div className='apple-cell' style={style}>🍎</div>

    }

    else {
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }

}

export default Apple;