import React from 'react';

import Header from './Header.js';
import Board from './Board.js';
import Gif from './Gif.js';
import StartBtn from './StartBtn.js'

// const App = () => <h1>Hello World</h1>;
// render(<App />, document.getElementById('root'));

export default class App extends React.Component {

    state = {
        header: '🐍 Snake Game 🐍',
        tagline: 'Play some snake FACers!!! 🐍 🐍 🐍 🐍 🐍',
        running: false
    };


    render() {
        return (
            <div>
                <Header header={this.state.header} tagline={this.state.tagline}/>
                <Board />
                <Gif />
                <StartBtn />
            </div>
        )
    }


}