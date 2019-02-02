import React from 'react';

import Header from './Header.js';
import Board from './Board.js';
import Gif from './Gif.js';



export default class App extends React.Component {

    state = {
        header: '🐍 Snake 🐍',
        tagline: 'Play some snake FACers!!! 🐍 🐍 🐍 🐍 🐍',
        overMessage: 'Game Over!',
        running: false,
        time: 0,
        snakeArr: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]],
        direction: 'right',
        boardWidth: 50,
        boardSquares: 20,
    };


    // mount the component, start the snake
    // - stuff here only happens once
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
        this.setState({running: true});
        this.startSnake();
    }

    // componentDidUpdate() {
    // }



    // set running to true to start
    // - might want to remove button after 1st click
    startBtnClick = () => {
        this.setState({
            running: true,
            snakeArr: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0]],
        })
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

                    // console.log('start interval: ', this.state);

                    // update the snake array (may not need to copy / clone)
                    const cloneSnake = Array.from(this.state.snakeArr);

                    // get the snake head (last item)
                    const snakeHead = cloneSnake[cloneSnake.length - 1];

                    // get x and y coords to set below
                    let [x, y] = snakeHead;

                    // update the direction
                    if (this.state.direction === 'up') {
                        y++;
                    }
                    if (this.state.direction === 'down') {
                        y--;
                    }
                    if (this.state.direction === 'left') {
                        x--;
                    }
                    if (this.state.direction === 'right' ) {
                        x++;
                    }


                    // alternative to above if else statements:
                    // - this works nicely, BUT can't tell whether x or y value gets output
                    // const a = (direction, coords) => {
                    //     const a = {
                    //         'up': coords[1]++,
                    //         'down': coords[1]--,
                    //         'right' : coords[0]++,
                    //         'left' : coords[0]--
                    //     }
                    //     return a[direction];
                    // }
                    // const b = a(this.state.direction, snakeHead);
                    // console.log(b);

                    

                    // make snake 3 items long (pop off first item)
                    const removeFirst = cloneSnake.shift();

                    // if length is 3, use initial snake head
                    let newHead = cloneSnake.length === 3 ? snakeHead : [x, y];


                    
                    
                    // off board checks
                    // - move snake to the other side of the board if it goes off the board
                    const size = this.state.boardSquares - 1;
                    // - x
                    if (newHead[0] < 0) {
                        newHead[0] = size;
                    }
                    if (newHead[0] > size) {
                        newHead[0] = 0;
                    }
                    // - y
                    if (newHead[1] < 0) {
                        newHead[1] = size;
                    }
                    if (newHead[1] > size) {
                        newHead[1] = 0;
                    }


                    
                    
                    // game over check
                    // - not working consistently
                    // - sees if the snake has hit itself
                    // - breaks with an arrow function or === on index
                    Array.prototype.containsArray = function(array) {
                        const hash = {};
                        array.map((item, index) => hash[this[index]] = index);
                        return hash.hasOwnProperty(array);
                    }
                    const gameOver = cloneSnake.containsArray(newHead);
                    // console.log(gameOver);
                    // console.log('a');



                    if (gameOver) {
                        clearInterval(this.timer);
                        // see if there is a way to reset to initial state
                        this.setState({ 
                            running: false,
                            time: 0,
                            snakeArr: [],
                            direction: 'right'                         
                        });
                        // console.log('game over check: ', this.state);
                    }




                    else {
                        // make the new snake if the game is not over
                        const newSnake = [...cloneSnake, ...[newHead]];
                        // set the state
                        this.setState({
                            time: Date.now() - startTime,
                            snakeArr: newSnake
                        })
                    }


                    

                }, 250); // quarter second
            }


            // ______________________
            // if (this.state.running === false && prevState.running === false) {
            //     console.log('did');
            // }

            // else - prevState.running === false
            else {
                console.log('prevState.running === false');
                // hopefully when running = false, this code will run
                // clear interval
                clearInterval(this.timer);
                this.setState({ running: false, time: 0 });
            }
        })
        
    }




    






    
    
    handleKeyPress = e => {

        let newDirection;
        const oldDirection = this.state.direction;
        
        // set direction based on keyCode
        // prevent snake from going back on itself
        if (e.keyCode === 38 && oldDirection !== 'down') {
            newDirection = 'up';
        }
        else if (e.keyCode === 40 && oldDirection !== 'up') {
            newDirection = 'down';
        }
        else if (e.keyCode === 37 && oldDirection !== 'right') {
            newDirection = 'left';
        }
        else if (e.keyCode === 39 && oldDirection !== 'left') {
            newDirection = 'right';
        }
        else {
            return false;
        }

        this.setState({ direction: newDirection });

    }




    



    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline} />
                <Board data={this.state} startover={this.startBtnClick} />
                <Gif data={this.state} />
            </div>
        )
    }

}