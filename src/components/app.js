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
        snakeArr: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]],
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

    // unmount the component
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
    // - add only if there isn't one on the board
    // - add after a timeout
    // - put in a random location (that isn't on the snake)
    // - if the snake intersects with it, make it disappear, give it extra length, and display points
    addApple = () => {
        // 🍎
    }


    // update the snake
    updateSnake = () => {
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
        
        
        // remove first item to keep snake the same length
        const removeFirst = cloneSnake.shift();

        // compose the new snake
        const newSnake = [...cloneSnake, ...[newHead]];


        
        
        // game over check function
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
                direction: 'right'                         
            });
        }
        else {
            this.setState({ snakeArr: newSnake })
        }
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
            snakeArr: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]]
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