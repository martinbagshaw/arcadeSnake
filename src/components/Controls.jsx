import React from "react";
import styled, { css } from "styled-components";

const ControlsContainer = styled.section`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  max-width: 100%;
  margin: 0 1rem;
  padding: 0.5rem 1rem 8rem;
  text-align: center;
  background-color: grey;
  @media only screen and (min-width: 600px) {
    max-width: 65vw;
    margin: 0 auto;
    flex-direction: column;
  }
  @media only screen and (min-width: 1000px) {
    height: 100%;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    width: 25vw;
    padding: 2rem 2.5vw;
  }
`;

const up = css`
  top: 0;
  left: 0;
`;
const down = css`
  bottom: 0;
  right: 0;
`;
const right = css`
  top: 0;
  right: 0;
`;
const left = css`
  bottom: 0;
  left: 0;
`;

const mixins = {
  up,
  down,
  right,
  left,
};

const Pad = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  margin-bottom: 0.5rem;
  background-color: gainsboro;
  &:after {
    position: absolute;
    top: calc(50% - 0.75rem);
    left: calc(50% - 0.75rem);
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    background-color: black;
  }
  @media only screen and (min-width: 600px) {
    margin-top: 0.5rem;
    margin-bottom: 0;
    width: 6rem;
    height: 6rem;
    border-radius: 3rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: rotate(45deg);
`;

const JoyStick = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: calc(50% - 0.5rem);
  width: 1rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: darkgrey;
  transform-origin: 50% 95%;
  transition: transform ease-in-out 0.2s;
  cursor: pointer;
  ${({ rotation }) => rotation && `transform: rotate(${rotation}deg)`};
  &:after {
    position: absolute;
    top: -0.75rem;
    left: calc(50% - 0.75rem);
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    background-color: red;
    cursor: pointer;
  }
  @media only screen and (min-width: 600px) {
    height: 3rem;
  }
`;

const Button = styled.button`
  background: none;
  box-shadow: none;
  outline: none;
  border: 0;
  z-index: 1;
  color: transparent;
  cursor: pointer;
  position: absolute;
  width: 3.75rem;
  height: 3.75rem;
  ${({ direction }) => direction && mixins[direction]};
  @media only screen and (min-width: 600px) {
    width: 2.75rem;
    height: 2.75rem;
  }
`;

const Controls = ({ rotation, setDirection }) => (
  <ControlsContainer>
    <p>use the directional keys or control pad to play</p>
    <Pad>
      <ButtonContainer>
        {["up", "down", "left", "right"].map((item) => (
          <Button aria-label={item} direction={item} key={item} onClick={(e) => setDirection(e, item)}>
            {item}
          </Button>
        ))}
      </ButtonContainer>
      <JoyStick rotation={rotation} />
    </Pad>
  </ControlsContainer>
);

export default Controls;
