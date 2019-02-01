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
        time: 0,
        snakeArr: [[0,0],[1,0],[2,0]]
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

                    // console.log(this.state.snakeArr);
                }, 500); // half second

            }
            // end the timer and render perhaps
        })
    }


    // update the snake state on each render
    updateSnake = () => {
        this.setState(prevState => {

            

            if (this.state.time > 0) {
                const newTime = this.state.time !== prevState.time;
                // console.log(newTime);
                console.log(this.state.snakeArr);
            }
        })
    }



    
    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline} />
                <Board time={this.state.time} snakeArr={this.state.snakeArr} update={this.updateSnake} running={this.state.running}/>
                <Gif />
                <StartBtn 
                onClick = {this.startBtnClick}
                />
            </div>
        )
    }


}