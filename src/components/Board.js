import React from "react";

// Components
import Apple from "./Apple.js";
import Snake from "./Snake.js";
import Score from "./Score.js";
import StartBtn from "./StartBtn.js";

// get the props from the parent component's state
const Board = props => {
  const { boardWidth, snakeArr, hiScore, running } = props.data;

  const style = {
    width: `${boardWidth}vw`,
    height: `${boardWidth}vw`
  };

  // startover needs to match up with startover passed in in app.js
  return (
    <div className="container game">
      <div className="board" style={style}>
        <div className="board-border" />
        <Apple data={props.data} />
        <Snake data={props.data} />
        <Score
          snakeLength={snakeArr.length}
          hiScore={hiScore}
          running={running}
        />
        <StartBtn onClick={props.startover} data={props.data} />
      </div>
    </div>
  );
};

export default Board;
