import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";

const StartContainer = styled.div`
  width: 20rem;
  height: 20rem;
  position: absolute;
  top: calc(50% - 10rem);
  bottom: calc(50% - 10rem);
  left: calc(50% - 10rem);
  right: calc(50% - 10rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const H2 = styled.h2`
  font-size: 2.5rem;
  font-family: "Eater", cursive;
  font-size: 1.85rem;
  margin: 1rem 0;
  @media only screen and (min-width: 600px) {
    font-size: 3rem;
  }
`;

const P = styled.p`
  font-size: 2rem;
  margin: 0;
`;

const flash = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const HighScore = styled.span`
  color: yellow;
  text-shadow: 0.1rem 0.2rem 0.5rem yellow;
  animation: linear 1s infinite;
  animation-name: ${flash};
`;

const Button = styled.button`
  z-index: 1;
  cursor: pointer;
  border: 0;
  background-color: greenyellow;
  color: green;
  border-radius: 0.25rem;
  font-size: 2rem;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  transition: all ease-in-out 0.3s;
  font-family: "VT323", monospace;
  &:hover {
    background-color: green;
    color: greenyellow;
  }
`;

const ResetButton = ({ highScore, resetGame, snakeArr }) => {
  const yourScore = snakeArr.length * 10 - 60;
  return (
    <StartContainer>
      <H2>Game Over!</H2>
      <P>{yourScore > highScore ?
        <HighScore>New High Score! {yourScore}</HighScore> :
        <Fragment>Your Score: {yourScore}</Fragment>}
      </P>
      <Button onClick={() => resetGame()}>Play Again &gt;</Button>
    </StartContainer>
  );
};

export default ResetButton;
