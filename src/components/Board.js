import React from 'react';
import Snake from './Snake';

export default class Board extends React.Component {

    state = {
    };

    render() {
        return (
            <div className="container">
                <div className="board">
                <Snake />
                {/* <div className="snake-cell"></div> */}
                </div>
            </div>
        )
    }


}