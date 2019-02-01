import React from 'react';

export default class Snake extends React.Component {

    constructor(props) {
        super(props);

        this.time = props.time;
        this.snake = props.snakeArr;
        // this.update = props.update;
        // this.update = this.update.bind(this);




    }

    // state = {
    //     snakeArr: [[0,0],[1,0],[2,0]]
    // };

    // update() {
    //     this.setState({snakeArr: 0});
    // }

    // links interval timer to render
    // - runs every 0.5s
    // - can't set state in here
    shouldComponentUpdate(nextProps) {

        // props.snakeArr = 4;
        // this.snake = 4;

        // this logs the update funciton we need to run:
        // this.setState({nextProps});
        // return [snakeArr,  snakeArr];


        // compare the current time to the old time
        const newTime = this.time !== nextProps.time;

        // // clone the snake form state, and get last item (which is the head)
        // const cloneSnake = Array.from(this.state.snakeArr);
        // const snakeHead = cloneSnake[cloneSnake.length - 1];

        // // // update the x value and create a new head
        // const newX = snakeHead[0]++;
        // const newHead = [newX, snakeHead[1]];

        // // // add the new head to the array
        // // // - want to pass this to state
        // const a = [...this.state.snakeArr, ...[newHead]];

        // // update the state with the above...
        // this.setState({snakeArr: a});

        

        // need to return something, but it doesn't seem to matter what
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

        // console.log('int');

        if (this.time !== this.props.time) {
            // console.log('int');
            // console.log(this.props.snakeArr, this.props.time);

        }
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