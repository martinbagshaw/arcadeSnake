import React from 'react';
import Snake from './Snake';

// get the props from the parent component's state
const Board = (props) => (
    <div className="container game">
        <div className="board">
            <Snake time={props.time} snakeArr={props.snakeArr} update={props.update} />
        </div>
    </div>
)

// export default class Board extends React.Component {
// }

export default Board;