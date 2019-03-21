import React from "react";

// get the props from the parent component's state
const Header = props => {
  const { header } = props;

  return (
    <div className="container header">
      <h1>{header}</h1>
    </div>
  );
};

export default Header;
