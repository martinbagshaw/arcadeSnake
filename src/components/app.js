import React from 'react';

import Header from './Header.js';
import Board from './Board.js';
import Gif from './Gif.js';
import StartBtn from './StartBtn.js'

export default class App extends React.Component {

    state = {
        header: '🐍 Snake 🐍',
        tagline: 'Play some snake FACers!!! 🐍 🐍 🐍 🐍 🐍',
        running: false,
        time: 0
    };

    // set running to true to start
    // - might want to remove button after 1st click
    startBtnClick = () => {
        this.setState({running: true})
        this.startSnake();
    }

    // set interval running after button click
    startSnake = () => {
        this.setState(prevState => {
            if (prevState.running === true) {
                // get the time from state
                const startTime = Date.now() - prevState.time;
                // set timer
                this.timer = setInterval(() => {
                    // console.log(Date.now() - prevState.time);
                    this.setState({ time: Date.now() - startTime })
                    // console.log(this.state.time);
                }, 500); // half second

            }
            // end the timer and render perhaps
        })
    }

    
    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline}/>
                <Board time={this.state.time}/>
                <Gif />
                <StartBtn 
                onClick = {this.startBtnClick}
                />
            </div>
        )
    }


}