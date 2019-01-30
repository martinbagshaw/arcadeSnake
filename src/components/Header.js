import React from 'react';

// const App = () => <h1>Hello World</h1>;
// render(<App />, document.getElementById('root'));

export default class Header extends React.Component {

    state = {
    };

    render() {
        return (
            <div className="container">
                <h1>🐍 Snake Game 🐍</h1>
                <p>play some snake FACers!!! 🐍 🐍 🐍 🐍 🐍</p>
            </div>
        )
    }


}