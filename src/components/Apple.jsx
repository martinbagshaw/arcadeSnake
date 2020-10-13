import React from "react";
import styled from "styled-components";

const Cell = styled.div`
  position: absolute;
  line-height: 1;
  font-size: ${({ size }) => `${size || 2}vw`};
  width: ${({ size }) => `${size || 2}vw`};
  height: ${({ size }) => `${size || 2}vw`};
  left: ${({ left }) => left && `${left}vw`};
  bottom: ${({ bottom }) => bottom && `${bottom}vw`};
`;

const Apple = ({ apple, squareSize }) => {
  const [left, right] = apple;
  return (
    <Cell bottom={right * squareSize} left={left * squareSize} size={squareSize}>
      🍎
    </Cell>
  );
};

export default Apple;
