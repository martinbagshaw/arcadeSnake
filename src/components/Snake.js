import React from 'react';

export default class Snake extends React.Component{
    state = {
        snakeArr: [[0,0],[1,0],[2,0]],
        time: 0
    };

    // snake knows to keep travelling in one direction because:
    // - we are only ever adding to item to the front of the array (the head)
    // - after 


    // 1. set an interval function
    // - run every 0.5s
    // - re-render on each interval


    render(){
        const snakeCells = this.state.snakeArr.map((item, index) => {
            // get x and y co-ordinates from each array item
            const style =  {
                left: `${item[0] * 5}vw`,
                bottom: `${item[1] * 5}vw`,
                item: index
            }

            // console.log(style);
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