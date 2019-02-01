import React from 'react';

export default class Snake extends React.Component {

    constructor(props) {
        super(props);

        this.time = props.time;
        this.snake = props.snakeArr;

    }

    shouldComponentUpdate(nextProps) {


        // compare the current time to the old time
        const newTime = this.time !== nextProps.time;

        // this duplicates the snake, and moves it one square to the right:
        // const cloneSnake = Array.from(this.snake.map(item => item[0]++));

        // need to return something, but it doesn't seem to matter what
        return newTime;

    }



    render(){

        // console.log('int');

        // if (this.time !== this.props.time) {
            // console.log('int');
            // console.log(this.props.snakeArr, this.props.time);

        // }
        // console.log(this.snake, this.time);

        const snakeCells = this.props.snakeArr.map((item, index) => {
            // get x and y co-ordinates from each array item
            const style =  {
                left: `${item[0] * 5}vw`,
                bottom: `${item[1] * 5}vw`,
                item: index
            }
        return style;
        })
        
        return (
            <React.Fragment>
                {snakeCells.map(style => {
                    return <div className='snake-cell' style={style} key={style.item}></div>
  
                })}
            </React.Fragment>
        )
    }
}