import React from "react";

// game over and start button
const StartBtn = props => {
  const { hiScore, snakeArr, running, overMessage } = props.data; // hiScore,

  // calculate topScore
  const yourScore = snakeArr.length * 10 - 60;

  // new high score message
  const isHighScore =
    yourScore > hiScore ? (
      <span>New High Score! {yourScore}</span>
    ) : (
      <>Your Score: {yourScore}</>
    );

  // onClick needs to match up with onClick passed in in Board.js
  const startover = props.onClick;

  if (!running) {
    return (
      <div className="start-over">
        <h2>{overMessage}</h2>
        <p>{isHighScore}</p>
        <button onClick={() => props.onClick(startover)} className="start-btn">
          Play Again >
        </button>
      </div>
    );
  }
  // may not need this:
  else {
    return <React.Fragment />;
  }
};

export default StartBtn;
