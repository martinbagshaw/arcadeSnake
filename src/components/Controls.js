import React from "react";
import DirectionBtns from "./DirectionBtns.js";

// includes right hand column gif (on large screens)
// - controls for the time being
const Controls = props => {
  const { running } = props.data;

  // make an api call to get a gif
  if (!running) {
    // console.log('not running from gif');
  }

  return (
    <div className="container gif">
      <p>use the directional keys or control pad to play</p>
      {/* <p>snakes on a plane gif to go here, obvs ✈️</p> */}
      <DirectionBtns data={props.data} dirBtns={props.dirBtns} />
    </div>
  );
};

export default Controls;
