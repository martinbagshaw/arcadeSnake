import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  text-align: left;
  color: white;
`;

const Hi = styled.div`
  color: yellow;
`;

const Score = ({ hiScore, running, snakeArr }) => {
  console.log('snakeArr', snakeArr);
  // reset score to 0 if the game is over
  const currentScore = running ? snakeArr.length * 10 - 60 : 0;
  console.log('currentScore', currentScore);
  return (
    <Container>
      <Hi>hi: {hiScore}</Hi>
      <div>score: {currentScore}</div>
    </Container>
  );
};

export default Score;
