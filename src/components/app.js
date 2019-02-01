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
        snakeArr: [[0,0],[1,0],[2,0]],
        direction: null
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


                    // update the snake array
                    const cloneSnake = Array.from(this.state.snakeArr); // may not need to copy / clone

                    // get the snake head (last item)
                    const snakeHead = cloneSnake[cloneSnake.length - 1];

                    
                    
                    // let direction;
                    console.log(this.state.direction);
                    

                    let newSnakeHead;
                    if (this.state.direction === 'up') {
                        newSnakeHead = [snakeHead[0], snakeHead[1]+=1]
                    }
                    else if (this.state.direction === 'down') {
                        newSnakeHead = [snakeHead[0], snakeHead[1]-=1]
                    }
                    else if (this.state.direction === 'left') {
                        newSnakeHead = [snakeHead[0]-=1, snakeHead[1]]
                    }
                    else if (this.state.direction === 'right' ) {
                        newSnakeHead = [snakeHead[0]+=1, snakeHead[1]]
                    }
                    // else {
                    //     newSnakeHead = [snakeHead[0]+=1, snakeHead[1]]
                    // }

                    console.log(newSnakeHead);
                    
                    // moving right only
                    // if starting value x = 2, dont increment x value
                    let newX;
                    if (cloneSnake.length === 3) {
                        newX = 2
                    } else {
                        newX = snakeHead[0]+=1;
                    }



                    // console.log(this.state.direction);

                    // update the snake head
                    const newHead = [newX, snakeHead[1]];

                    // const newHead = newSnakeHead;

                    // add the new head to the array
                    const a = [...this.state.snakeArr, ...[newHead]];
                    // can also do: this.state.snakeArr.concat([newHead]);


                    this.setState({
                        time: Date.now() - startTime,
                        snakeArr: a
                    })
                    
                    // console.log(this.state);
                }, 500); // half second
            }
        })
        
    }





    handleKeyPress = (e) => {

        let direction;
        
        if (e.keyCode === 38) {
            direction = 'up';
        }
        if (e.keyCode === 40) {
            direction = 'down';
        }
        if (e.keyCode === 37) {
            direction = 'left';
        }
        if (e.keyCode === 39) {
            direction = 'right';
        }

        this.setState({ direction: direction });
        // console.log(this.state.direction);


    }




    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }



    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline} />
                <Board time={this.state.time} snakeArr={this.state.snakeArr} update={this.updateSnake} running={this.state.running}/>
                <Gif />
                <StartBtn onClick = {this.startBtnClick} />
            </div>
        )
    }

}