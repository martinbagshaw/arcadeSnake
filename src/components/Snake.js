import React from 'react';

const Snake = props => {

    const { snakeArr, boardWidth, boardSquares } = props.data;

    const points = snakeArr.length * 10;

    const snake = snakeArr.map((item, index) => {
        const squareSize = boardWidth / boardSquares;
        const style =  {
            left: `${item[0] * squareSize}vw`,
            bottom: `${item[1] * squareSize}vw`,
            width: `${squareSize}vw`,
            height: `${squareSize}vw`,
        }
        return <div className='snake-cell' style={style} key={index}></div>
    });

    // return snake;
    return (
        <React.Fragment>
            {snake}
            <div className="points-score">score: {points}</div>
        </React.Fragment>
    )

}

export default Snake;