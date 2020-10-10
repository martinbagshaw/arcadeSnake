import React, { Fragment } from "react";
import styled from "styled-components";

import Header from "./Header";
import Apple from "./Apple";
import Snake from "./Snake";
import Score from "./Score";
import ResetButton from "./ResetButton";
import Controls from "./Controls";

const GameContainer = styled.div`
  max-width: 100%;
  margin: 0 1rem;
  padding: 0.5rem 0 0;
  text-align: center;
  background-color: grey;
  @media only screen and (min-width: 600px) {
    max-width: 65vw;
    margin: 0 auto;
  }
  @media only screen and (min-width: 1000px) {
    padding-top: 0;
    margin-top: 2.5rem;
  }
`;

const Board = styled.div`
  width: ${({ setSize }) => `${setSize}vw` || "auto"};
  height: ${({ setSize }) => `${setSize}vw` || "auto"};
  margin: 0 auto;
  display: block;
  position: relative;
  background-color: black;
  border: 0.5vw solid darkgray;
  border-radius: 0.25vw;
  box-sizing: content-box;
  &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    display: block;
    box-shadow: 0.125rem 0.6125rem 2.125rem inset, 0.125rem 0.325rem 1rem inset rgba(255, 255, 255, 0.5),
      -0.125rem -0.25rem 1.5rem inset rgba(255, 255, 255, 0.5);
  }
  @media only screen and (min-width: 1000px) {
    z-index: 1;
  }
`;

const Border = styled.div`
  position: absolute;
  z-index: 1;
  top: -0.5vw;
  bottom: -0.5vw;
  left: -0.5vw;
  right: -0.5vw;
  border: 0.25rem solid darkgray;
  border-radius: 0.5vw;
  @media only screen and (min-width: 600px) {
    &:after {
      box-shadow: 0.25rem -0.5rem 4.25rem inset, 0.25rem -0.75rem 1rem inset rgba(255, 255, 255, 0.25), -0.25rem 0.5rem 2rem inset rgba(255, 255, 255, 0.5),
        -0.5rem 0.5rem 2rem inset rgba(255, 255, 255, 0.5);
    }
  }
`;

const settings = {
  boardSquares: 20,
  interval: 250,
  snake: [
    [0, 10],
    [1, 10],
    [2, 10],
    [3, 10],
    [4, 10],
    [5, 10],
  ],
};

export default class App extends React.Component {
  state = {
    apple: [5, 4],
    direction: "right",
    hiScore: 0,
    rotation: 90,
    running: false,
    snakeArr: settings.snake
  };

  // mount the component, start the snake
  // - stuff here only happens once
  componentDidMount() {
    window.addEventListener("keydown", this.handleDirection);
    window.addEventListener("load", this.handleBoardWidth);
    window.addEventListener("resize", this.handleBoardWidth);
    this.scoreToState();
    this.setState({ running: true });
    this.startSnake();
    this.addApple();
  }

  // unmount the component
  // - do I need to reset the state here? possibly...
  componentWillUnmount() {
    // console.log('unmount');
    clearInterval(this.timer);
  }

  handleBoardWidth = (e) => {
    const boardWidth = e.currentTarget.innerWidth > 600 ? 47.5 : 80;
    this.setState({ boardWidth: boardWidth });
  };

  // move snake on page load
  // - running state is not related to interval at present
  startSnake = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.updateSnake();
    }, settings.interval);
  };

  // high score
  // - set highscore on game end
  highScore = (snakeLength) => {
    // 60 = 6 snake squares
    const score = snakeLength * 10 - 60;

    const tokenKey = Object.keys(localStorage).find((item) => item === "arcadeSnakeGameScore");

    // not in localStorage, add it
    if (!tokenKey) {
      localStorage.setItem("arcadeSnakeGameScore", score);
    }
    // in localStorage
    else {
      const storedScore = localStorage["arcadeSnakeGameScore"];
      if (score > storedScore) {
        localStorage.setItem("arcadeSnakeGameScore", score);
      }
    }
  };

  // send score from localStorage to state
  scoreToState = () => {
    const tokenKey = Object.keys(localStorage).find((item) => item === "arcadeSnakeGameScore");
    if (tokenKey) {
      const score = localStorage.getItem("arcadeSnakeGameScore", score);
      this.setState({ hiScore: score });
    }
  };

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
    const boardSize = settings.boardSquares;

    // - - - - - - - - -
    // 1. get snake
    const snake = this.state.snakeArr;

    // 2. get grid
    // - all coords for boardSize squared
    let grid = [];
    Array(boardSize)
      .fill(0)
      .map((row, rowInd) => {
        Array(boardSize)
          .fill(0)
          .map((e, cellInd) => {
            grid.push([cellInd, rowInd]);
          });
      });

    // 3. subtract snake coords from grid coords to get available squares for apple
    const availableCells = (a1, a2) => {
      // a is used as an object, diff = returned array
      const a = [],
        diff = [];

      // map through board:
      // - assign each coordinate a value of true
      a2.map((arr, ind) => (a[a1[ind]] = true));

      // map through board AND 'a' object:
      // - if item matches, delete it, otherwise it's value is still true
      a2.map((arr, ind) => {
        a[a2[ind]] ? delete a[a2[ind]] : (a[a2[ind]] = true);
      });

      // push to the new array (from 'a' object)
      for (const k in a) {
        const x = parseInt(k.split(",")[0]);
        const y = parseInt(k.split(",")[1]);
        if (!isNaN(x && y)) diff.push([x, y]);
      }

      return diff;
    };
    const available = availableCells(snake, grid);

    // 4. set the apple position using available squares
    const randomInd = (numberAvailable) => {
      let rand = Math.floor(Math.random() * numberAvailable - 1);
      // if -ve, *-1
      return rand < 0 ? (rand *= -1) : rand;
    };

    const newAppleInd = randomInd(available.length);
    const newApple = available[newAppleInd];

    this.setState({ apple: newApple });

    // }
  };

  // update the snake
  // - pass state in as a prop?
  updateSnake = () => {
    // const startTime = performance.now();
    // https://stackoverflow.com/questions/41218507/violation-long-running-javascript-task-took-xx-ms

    const cloneSnake = Array.from(this.state.snakeArr);

    // get the snake head (last item in the array)
    const snakeHead = cloneSnake[cloneSnake.length - 1];
    let [x, y] = snakeHead;

    // update the direction
    if (this.state.direction === "up") {
      y++;
    }
    if (this.state.direction === "down") {
      y--;
    }
    if (this.state.direction === "left") {
      x--;
    }
    if (this.state.direction === "right") {
      x++;
    }

    // off board checks
    // - move snake to the other side of the board if it goes off the board
    const size = settings.boardSquares - 1;
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
    const removeDuplicates = (arr) => {
      let i,
        out = [],
        obj = {};
      arr.map((cell, ind) => (obj[arr[ind]] = 0));
      for (i in obj) {
        out.push(i);
      }
      return out;
    };
    const noDupes = removeDuplicates(newSnake);
    // console.log(newSnake, noDupes)

    // game over check
    const gameOver = newSnake.length === noDupes.length ? false : true;

    if (gameOver) {
      clearInterval(this.timer);

      // high score function
      // - check hiScore, and add high score to the state
      this.highScore(this.state.snakeArr.length);

      this.setState({
        running: false,
        // snakeArr: [],
        direction: "right",
        apple: [5, 4],
      });
    } else {
      this.setState({ snakeArr: newSnake });
    }

    // const duration = performance.now() - startTime;
    // console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
  };

  // control movement
  // - 'e' can be key or string passed in from button
  handleDirection = (e, item) => {
    let newDir;
    const oldDir = this.state.direction;

    // set direction based on keyCode
    // prevent snake from going back on itself
    if ((e.keyCode === 38 || item === "up") && oldDir !== "down") {
      newDir = "up";
    } else if ((e.keyCode === 40 || item === "down") && oldDir !== "up") {
      newDir = "down";
    } else if ((e.keyCode === 37 || item === "left") && oldDir !== "right") {
      newDir = "left";
    } else if ((e.keyCode === 39 || item === "right") && oldDir !== "left") {
      newDir = "right";
    } else {
      return false;
    }

    let newRotation = this.state.rotation;
    // clockwise
    if (
      (oldDir === "down" && newDir === "left") ||
      (oldDir === "up" && newDir === "right") ||
      (oldDir === "right" && newDir === "down") ||
      (oldDir === "left" && newDir === "up")
    ) {
      newRotation += 90;
    }
    // anticlockwise
    else if (
      (oldDir === "down" && newDir === "right") ||
      (oldDir === "up" && newDir === "left") ||
      (oldDir === "right" && newDir === "up") ||
      (oldDir === "left" && newDir === "down")
    ) {
      newRotation -= 90;
    }

    this.setState({
      direction: newDir,
      rotation: newRotation,
    });
  };

  // start snake on game over
  resetClick = () => {
    clearInterval(this.timer);
    this.setState({
      running: true,
      snakeArr: settings.snake,
    });
    this.scoreToState(); // update hiScore
    this.startSnake();
  };

  render() {
    const { apple, boardWidth, hiScore, rotation, running, snakeArr } = this.state;
    const squareSize = boardWidth / settings.boardSquares || 2;

    return (
      <Fragment>
        <Header />
        <GameContainer>
          <Board setSize={boardWidth}>
            <Border />
            {apple.length === 2 && <Apple apple={apple} squareSize={squareSize} />}
            <Snake snakeArr={snakeArr} squareSize={squareSize} />
            <Score hiScore={hiScore} running={running} snakeArr={snakeArr} />
            {!running && <ResetButton hiScore={hiScore} resetGame={this.resetClick} snakeArr={snakeArr} />}
          </Board>
        </GameContainer>
        <Controls rotation={rotation} setDirection={this.handleDirection} />
      </Fragment>
    );
  }
}
