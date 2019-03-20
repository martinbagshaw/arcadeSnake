import React from "react";

const Score = props => {
  const { snakeLength, hiScore, running } = props;
  // reset score to 0 if the game is over
  const currentScore = running ? snakeLength * 10 - 60 : 0;

  // need to add and get hi to / from localStorage

  return (
    <div className="points-score">
      <div className="hi">hi: {hiScore}</div>
      <div className="current">score: {currentScore}</div>
    </div>
  );
};

export default Score;
