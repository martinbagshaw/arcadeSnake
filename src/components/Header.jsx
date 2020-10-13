import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  max-width: 100%;
  margin: 1rem 1rem 0;
  padding: 0 1rem;
  text-align: center;
  background-color: green;
  border: 0.5rem solid dimgrey;
  border-bottom: 1rem solid #343434;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: -0.125rem 0.25rem 1.5rem inset greenyellow, -0.375rem -2.25rem 3rem inset greenyellow;
  @media only screen and (min-width: 600px) {
    max-width: 65vw;
    margin: 1rem auto 0;
    box-shadow: -0.25rem 0.5rem 3rem inset greenyellow, -0.75rem -4.5rem 6rem inset greenyellow;
  }
  @media only screen and (min-width: 1000px) {
    margin-top: 0;
    border: 0;
    border-radius: 0.5vw;
    position: fixed;
    top: 2.5rem;
    left: 4rem;
    height: 48.5vw;
    max-width: 16vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const H1 = styled.h1`
  font-family: "Eater", cursive;
  font-size: 2.5rem;
  line-height: 1.8;
  margin: -0.5rem 0 0;
  color: darkolivegreen;
  text-shadow: -0.1rem -0.1rem 0 greenyellow, 0.1rem 0.1rem 0 greenyellow, -0.1rem 0.1rem 0 green, 0.1rem 0.1rem 0 green, 0.25rem 0.125rem 0.5rem white,
    -0.25rem 0.125rem 0.5rem white;
  @media only screen and (min-width: 600px) {
    font-size: 3.25rem;
    line-height: 1.5;
  }
  @media only screen and (min-width: 768px) {
    font-size: 4rem;
  }
  @media only screen and (min-width: 1000px) {
    font-size: 3.5rem;
    max-width: 4vw;
    word-wrap: break-word;
    line-height: 1.2;
    margin: 1rem auto;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 4rem;
  }
`;

const Header = () => (
  <HeaderContainer>
    <H1>🐍 Snake 🐍</H1>
  </HeaderContainer>
);

export default Header;
