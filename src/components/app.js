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

                    
                    
                    
                    // console.log('state snake: ', this.state.snakeArr);
                    // this is adding to the array, but the head coords are not incrementing

                    
                    
                    // update the snake array
                    const cloneSnake = Array.from(this.state.snakeArr);
                    // console.log('clone snake: ', cloneSnake);


                    const snakeHead = cloneSnake[cloneSnake.length - 1];

                    // const head = cloneSnake.length - 1;
                    // console.log(cloneSnake[head][0] += 1)

                    // update the x value and create a new head

                    // if starting value x = 2, dont increment x value
                    let newX;
                    if (cloneSnake.length === 3) {
                        newX = 2
                    } else {
                        newX = snakeHead[0]+=1;
                    }
                    console.log(newX);
                    // const newX = snakeHead[0] === 2 ? snakeHead[0] : snakeHead[0]+=1;

                    // const newX = snakeHead[0]+=1;
                    const newHead = [newX, snakeHead[1]];

                    // add the new head to the array
                    const a = [...this.state.snakeArr, ...[newHead]];



                    this.setState({
                        time: Date.now() - startTime,
                        snakeArr: a
                    })
                    
                    // console.log(this.state);
                }, 500); // half second
            }
        })
        
    }



    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline} />
                <Board time={this.state.time} snakeArr={this.state.snakeArr} update={this.updateSnake} />
                <Gif />
                <StartBtn onClick = {this.startBtnClick} />
            </div>
        )
    }

}