import React from 'react';

// get the props from the parent component's state
const Header = (props) => (
    <div className="container header">
        <h1>{props.header}</h1>
        <p>{props.tagline}</p>
    </div>
)

export default Header;