import React, { useEffect, useRef, useState, Fragment } from "react";
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

// save and get high score from storage
const storageKey = Object.keys(localStorage).find((item) => item === "arcadeSnakeGameScore");
const setScoreToStorage = (snakeLength) => {
  const score = snakeLength * 10 - 60;
  if (score > localStorage[storageKey] || !storageKey) {
    localStorage.setItem("arcadeSnakeGameScore", score);
  }
};
const getScoreFromStorage = () => {
  if (storageKey) {
    return localStorage.getItem(storageKey);
  }
};

const App = () => {
  const [apple, setApple] = useState([5, 4]);
  const [boardWidth, setBoardWidth] = useState(47.5);
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [snake, setSnake] = useState(settings.snake);

  const handleDirection = (e, item) => {
    const codes = {
      38: "up",
      39: "right",
      40: "down",
      37: "left",
    };
    const opposites = {
      up: "down",
      down: "up",
      right: "left",
      left: "right",
    };

    let newDir = direction;
    const input = codes[e.keyCode] || item;
    if (input) {
      newDir = direction !== opposites[input] ? input : direction;
    }
    setDirection(newDir);
  };

  const handleBoardWidth = (e) => {
    const width = e.currentTarget.innerWidth > 600 ? 47.5 : 80;
    setBoardWidth(width);
  };

  const updateSnake = () => {
    const getNewHead = (snake, direction) => {
      const newSnake = [...snake];
      const snakeHead = newSnake[snake.length - 1];
      let [x, y] = snakeHead;
      if (direction === "up") {
        y++;
      }
      if (direction === "down") {
        y--;
      }
      if (direction === "left") {
        x--;
      }
      if (direction === "right") {
        x++;
      }
      // off board checks - move to other side of board
      const size = settings.boardSquares - 1;
      if (x < 0) {
        x = size;
      }
      if (x > size) {
        x = 0;
      }
      if (y < 0) {
        y = size;
      }
      if (y > size) {
        y = 0;
      }
      return [x, y];
    };
    const didEatApple = (apple, newHead) => {
      const [a1, a2] = apple;
      const [h1, h2] = newHead;
      if (a1 === h1 && a2 === h2) {
        return true;
      }
      return false;
    };
    const getNewSnake = (snake, snakeHead, ateApple) => {
      const newSnake = [...snake];
      const snakeBody = ateApple ? newSnake : [...newSnake.slice(0, 0), ...newSnake.slice(0 + 1)];
      return [...snakeBody, snakeHead];
    };
    const checkGameOver = (newSnake) => {
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
      return newSnake.length !== removeDuplicates(newSnake).length;
    };

    const newHead = getNewHead(snake, direction);
    const ateApple = didEatApple(apple, newHead);
    const newSnake = getNewSnake(snake, newHead, ateApple);
    const gameOverTrue = checkGameOver(newSnake);

    if (gameOverTrue) {
      setApple([5, 4]);
      setDirection("right");
      setRunning(false);
      setGameOver(true);
      setScoreToStorage(snake.length);
    } else {
      if (ateApple) {
        addApple();
      }
      setSnake(newSnake);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateSnake(() => setSnake(snake));
    }, settings.interval);
    return () => clearInterval(interval);
  }, [snake]);

  useEffect(() => {
    window.addEventListener("load", handleBoardWidth);
    window.addEventListener("resize", handleBoardWidth);
    setHighScore(getScoreFromStorage());
    setRunning(true);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleDirection);
    return () => {
      document.removeEventListener("keydown", handleDirection);
    };
  }, [direction]);

  const addApple = () => {
    const boardSize = settings.boardSquares;

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
    setApple(newApple);
  };

  const resetClick = () => {
    setHighScore(getScoreFromStorage());
    setRunning(true);
    setSnake(settings.snake);
  };

  const squareSize = boardWidth / settings.boardSquares || 2;

  return (
    <Fragment>
      <Header />
      <GameContainer>
        <Board setSize={boardWidth}>
          <Border />
          {apple.length === 2 && <Apple apple={apple} squareSize={squareSize} />}
          <Snake snakeArr={snake} squareSize={squareSize} />
          <Score highScore={highScore} running={running} snakeArr={snake} />
          {gameOver && <ResetButton highScore={highScore} resetGame={resetClick} snakeArr={snake} />}
        </Board>
      </GameContainer>
      <Controls direction={direction} setDirection={handleDirection} />
    </Fragment>
  );
};

export default App;
