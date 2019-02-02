import React from 'react';


// perhaps re-write this as a function, rather than a class component
// - find out the actual role of constructor here too
// export default class Snake extends React.Component {

//     constructor(props) {
//         super(props);

//         // see issue regarding props here being unnecessary
//         this.time = props.time;
//         this.snake = props.snakeArr;
//         // this.running = props.running;


//     }

//      // not using this at present:
//     //  shouldComponentUpdate(nextProps) {
//     //     // compare the current time to the old time
//     //     const newTime = this.time !== nextProps.time;

//     //     // this duplicates the snake, and moves it one square to the right:
//     //     // const cloneSnake = Array.from(this.snake.map(item => item[0]++));

//     //     // need to return something, but it doesn't seem to matter what
//     //     return newTime;
//     // }



//     render(){

//         // see issue regarding using one map
//         const snakeCells = this.props.snakeArr.map((item, index) => {
//             // get x and y co-ordinates from each array item
//             const style =  {
//                 left: `${item[0] * 2.5}vw`,
//                 bottom: `${item[1] * 2.5}vw`,
//                 item: index
//             }
//         return style;
//         })
        
//         return (
//             <React.Fragment>
//                 {snakeCells.map(style => {
//                     return <div className='snake-cell' style={style} key={style.item}></div>
//                 })}
//             </React.Fragment>
//         )
//     }
// }



const Snake = props => {

    const { snakeArr, boardWidth, boardSquares } = props.data;
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

    return snake;

}

export default Snake;