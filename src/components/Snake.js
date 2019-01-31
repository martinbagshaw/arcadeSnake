import React from 'react';

export default class Snake extends React.Component {

    constructor(props) {
        super(props);

        this.time = props.time;
        this.snake = props.snakeArr;
        this.update = props.update;

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

        const cloneSnake = Array.from(this.snake);
        const snakeHead = cloneSnake[cloneSnake.length - 1];

        // update the x value
        const newX = snakeHead[0]++;
        const newHead = [newX, snakeHead[1]];

        // console.log(cloneSnake.push(newHead));

        const a = [...cloneSnake, ...[newHead]];
        console.log(a);


        // this.snake = [cloneSnake, ...newHead];

        // const a = cloneSnake.concat(newHead);
        // console.log(a);

        
    //     // console.log(newHead);

    //     // this.setState({snakeArr: [cloneSnake, ...newHead]})

    //     // update the state here with setState


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