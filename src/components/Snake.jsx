import React, { Fragment } from "react";
import styled from "styled-components";

const Cell = styled.div`
  position: absolute;
  background: radial-gradient(greenyellow, green);
  border: 0.15vw solid black;
  border-radius: 0.5vw;
  width: ${({ size }) => `${size || 2}vw`};
  height: ${({ size }) => `${size || 2}vw`};
  left: ${({ left }) => left && `${left}vw`};
  bottom: ${({ bottom }) => bottom && `${bottom}vw`};
`;

const Snake = ({ snakeArr, squareSize }) => (
  <Fragment>
    {snakeArr ? snakeArr.map(([left, right], index) => (
      <Cell
        key={index}
        bottom={right * squareSize}
        left={left * squareSize}
        size={squareSize} />
    )) : null}
  </Fragment>
);

export default Snake;
