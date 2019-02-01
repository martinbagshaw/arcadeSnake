import React from 'react';
import Snake from './Snake';

// export default class Board extends React.Component {

//     state = {
//     };

//     render() {
//         return (
//             <div className="container game">
//             {props.time}
//                 <div className="board">
//                 <Snake time={props.time}/>
//                 {/* <div className="snake-cell"></div> */}
//                 </div>
//             </div>
//         )
//     }


// }


// get the props from the parent component's state
const Board = (props) => (
    <div className="container game">
        <div className="board">
        <Snake time={props.time} snakeArr={props.snakeArr} update={props.update} running={props.running}/>
        </div>
    </div>
)

export default Board;