import React from 'react';

export default class Snake extends React.Component{
    state = {
        snakeArr: [[0,0],[1,0],[2,0]],
        time: 0
    };


    render(){
        const snakeCells = this.state.snakeArr.map((item, index) => {
            const xaxis = item[0] * 5;
            const yaxis = item[1] * 5;
            const style =  {
                left: `${xaxis}vw`,
                bottom: `${yaxis}vw`,
                item: index
            }

            console.log(style);
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