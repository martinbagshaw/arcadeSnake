import React from 'react';
import { lte } from 'semver';

export default class Snake extends React.Component {

    constructor(props) {
        super(props);

        this.time = props.time;
        this.snake = props.snakeArr;
        this.update = props.update;
        this.running = props.running;

    }


    // links interval timer to render
    // - runs every 0.5s
    shouldComponentUpdate(nextProps) {
    

        // console.log(this.update);
        
        const newTime = this.time !== nextProps.time;

    //     if (newTime) {
    //         props.update(props.snakeArr)
    //     }
        
    //     // console.log(nextProps);
    //     // console.log(this.snake);


    //   console.log(this.snake);
        
        // const cloneSnake = Array.from(this.snake);
        // const snakeHead = cloneSnake[cloneSnake.length - 1];
        // update the x value
        // const newX = snakeHead[0]++;
        // const newHead = [newX, snakeHead[1]];
        // this.snake = [cloneSnake, ...newHead];


        // Copies snake arr from state and maps over each item, 
        // increasing the x co-ord by one on each interval 
        const cloneSnake = Array.from(this.snake).map(item => {item[0]++});
        // cloneSnake = originalSnake.concat(cloneSnake);

     





        return newTime;
    }

    
    // snake knows to keep travelling in one direction because:
    // - we are only ever adding to item to the front of the array (the head)
    // - after 


    // 1. set an interval function
    // - run every 0.5s
    // - re-render on each interval

    // every time this.time changes, we need to re-render and run all of the checks
    // {/* {this.time} */}



    render(){

        // console.log(this.time);

        const snakeCells = this.snake.map((item, index) => {
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