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
        interval: 250,
        snakeArr: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10]],
        direction: 'right',
        boardWidth: 50,
        boardSquares: 20,
        apple: [5, 4] // set initial apple
    };


    // mount the component, start the snake
    // - stuff here only happens once
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
        this.setState({running: true});
        this.startSnake();
        this.addApple();
    }

    // unmount the component
    // - do I need to reset the state here? possibly...
    componentWillUnmount() {
        // console.log('unmount');
        clearInterval(this.timer);
    }


    // move snake on page load
    // - running state is not related to interval at present
    startSnake = () => {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.updateSnake();
        }, this.state.interval);        
    }



    // add apple
    // - may want to refactor this to not set the state itself


    // - add only if there isn't one on the board
    // - put in a random location (that isn't on the snake)
    // - if the snake intersects with it, make it disappear, give it extra length, and display points
    addApple = () => {
        // 🍎  will get output from a component


        // apple needs to be preset
        // if (this.state.apple.length===2) {
            

            // get board size
            const boardSize = this.state.boardSquares;

            // - - - - - - - - - 
            // 1. get snake
            const snake = this.state.snakeArr;

            // 2. get grid
            // - all coords for boardSize squared
            // let grid = [];
            // Array(boardSize).fill(0).map((row, rowInd) => {
            //     Array(boardSize).fill(0).map((e, cellInd) => { grid.push([cellInd, rowInd]) })
            // });

            // 3. subtract snake coords from grid coords, but this just wasn't working ffs
            

            // ---
            // alternatively
            // pick random coords based on board size
            // - check new array isn't in snake array

            // random number based on boardSize
            const random = () => {
                let rand = Math.floor(Math.random()* boardSize - 1);
                // if -ve, *-1
                return rand < 0 ? rand*=-1 : rand;
            }

            // random apple coords
            let apple = [random(), random()];


            // recursion, yay!
            // - this will break the call stack if it keeps running
            // - ...but realistically, this will only run once before apple state gets set
            const applePosition = (origPosition, snakeArray) => {
                
                const results = snakeArray.filter(array => array.every(item => origPosition.includes(item)));
                if (results.length === 0) {
                    return origPosition;
                }
                return applePosition(origPosition, snakeArray);

            }
            const a = applePosition(apple, snake);
            this.setState({ apple: a })


        // }
    }


    // update the snake
    updateSnake = () => {

        // const startTime = performance.now();
        // https://stackoverflow.com/questions/41218507/violation-long-running-javascript-task-took-xx-ms


        const cloneSnake = Array.from(this.state.snakeArr);

        // get the snake head (last item in the array)
        const snakeHead = cloneSnake[cloneSnake.length - 1];
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

        
        // off board checks
        // - move snake to the other side of the board if it goes off the board
        const size = this.state.boardSquares - 1;
        // - x
        if (x < 0) {
            x = size;
        }
        if (x > size) {
            x = 0;
        }
        // - y
        if (y < 0) {
            y = size;
        }
        if (y > size) {
            y = 0;
        }
        const newHead = [x, y];
        
        

        // see if snake head has got the apple
        // - if not, reduce length of array as above
        if (JSON.stringify(this.state.apple) === JSON.stringify(newHead)) {
            // console.log('got apple');
            // this sets the state, probably not legit:
            this.addApple();
        } else {
            // remove first item to keep snake the same length
            // - avoid this, removeFirst is not used, makes overall function impure
            const removeFirst = cloneSnake.shift();
        }

        // compose the new snake
        const newSnake = [...cloneSnake, ...[newHead]];


        
        
        // game over check function
        // - return true if there are duplicates in the array
        const removeDuplicates = arr => {
            let i, out = [], obj = {};
            arr.map((cell, ind) => obj[arr[ind]] = 0);
            for (i in obj) {
              out.push(i);
            }
            return out;
        }
        const noDupes = removeDuplicates(newSnake);
        // console.log(newSnake, noDupes)


        // game over check
        const gameOver = newSnake.length === noDupes.length ? false : true;

        if (gameOver) {
            clearInterval(this.timer);
            this.setState({ 
                running: false,
                snakeArr: [],
                direction: 'right',
                apple: [5, 4]                       
            });
        }
        else {
            this.setState({ snakeArr: newSnake })
        }

        // const duration = performance.now() - startTime;
        // console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
    }



    


    
    
    // control movement
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

        // occasional error message leads to here:
        // - usually happens after idle time on the page / tab

        // Warning: Can't perform a React state update on an unmounted component.
        // This is a no-op, but it indicates a memory leak in your application.
        // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
    // in App

        this.setState({ direction: newDirection });

    }



    // start snake on game over
    startBtnClick = () => {
        clearInterval(this.timer);
        this.setState({
            running: true,
            snakeArr: [[0,10],[1,10],[2,10],[3,10],[4,10],[5,10]]
        })
        this.startSnake();
    }





    render() {
        return (
            <React.Fragment>
                <Header data={this.state} />
                <Board data={this.state} startover={this.startBtnClick} />
                <Gif data={this.state} />
            </React.Fragment>
        )
    }

}