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

const Score = ({ highScore, running, snakeArr }) => {
  const currentScore = running ? snakeArr.length * 10 - 60 : 0;
  return (
    <Container>
      <Hi>hi: {highScore}</Hi>
      <div>score: {currentScore}</div>
    </Container>
  );
};

export default Score;
