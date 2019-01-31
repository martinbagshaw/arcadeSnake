import React from 'react';

import Header from './Header.js';
import Board from './Board.js';
import Gif from './Gif.js';

// const App = () => <h1>Hello World</h1>;
// render(<App />, document.getElementById('root'));

export default class App extends React.Component {

    state = {
        header: '🐍 Snake 🐍',
        tagline: 'Play some snake FACers!!! 🐍 🐍 🐍 🐍 🐍'
    };

    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline}/>
                <Board />
                <Gif />
            </div>
        )
    }


}