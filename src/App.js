import React, { Component } from 'react';
import './App.css';



class App extends Component {
  state = {
    board : [],
    turn : 0,
    selected : 1,
    secretcode : [1,2,3,4]
  }

  initilize = () => {
    const rowsArray = [];
    for(let i = 0; i<10;i++){
      rowsArray.push([0,0,0,0])
    }

    this.setState({board : rowsArray})
  }


  componentDidMount = () => {
    this.initilize()
  }

  assignClasses = (colorValue) => {
    if(colorValue===0){
      return "white-dot dot"
    }
    else if (colorValue===1){
      return "red-dot dot"
    }
    else if (colorValue===2){
      return "blue-dot dot"
    }
    else if (colorValue===3){
      return "green-dot dot"
    }
    else if (colorValue===4){
      return "orange-dot dot"
    }
    else if (colorValue===5){
      return "yellow-dot dot"
    }
    else if (colorValue===6){
      return "brown-dot dot"
    }
  }

  asignColor = (outerArrayIndex, innerArrayIndex) => {
    if(outerArrayIndex===this.state.turn){
      const tempArray = this.state.board.concat();
      tempArray[outerArrayIndex][innerArrayIndex] = this.state.selected;
      this.setState({board:tempArray})
    }
  }

  setColor = (colorApp) => {
    this.setState({selected:colorApp})
  }


  decoder = (position)=>{
      
    if(this.state.board[position].findIndex( color => color===0) !== -1){
      // if they haven't filled in the row don't decode yet, temperary till 
      // i impliment a submit button to stop errors from comparisons
      return;
    }

    let matchPositionColor = 0;
    let matchColor = 0; 
    const arraySolution = this.state.secretcode.slice();
    const arrayGuess = this.state.board[position].slice();
    const createDotsArray = [];

    // console.log(arrayGuess,arraySolution)

    arrayGuess.forEach((letter,index )=> {
      if(letter === arraySolution[index]){
        // console.log(arrayGuess,arraySolution)
        matchPositionColor++;
        arraySolution[index]='!'
        // console.log(arrayGuess,arraySolution)
      }else{
        if(arraySolution.indexOf(letter)!==-1){
          // console.log(arrayGuess,arraySolution)
          arraySolution[arraySolution.indexOf(letter)]="!";
          matchColor++;
          // console.log(arrayGuess,arraySolution)
  
        }
      }
    });
    // console.log(`Number of matched color and position ${matchPositionColor} number of matched just color ${matchColor}`)
    for(let i = 0;i<matchPositionColor;i++){
      createDotsArray.push(<div key={"black" + i} className="black-dot small-dot"></div>)
    }
    for(let i = 0;i<matchColor;i++){
      createDotsArray.push(<div key={"white" + i} className="white-dot small-dot"></div>)
    }
    for(let i = 0;i<4 - (matchColor+matchPositionColor);i++){
      createDotsArray.push(<div key={"grey" + i} className="grey-dot small-dot"></div>)
    }
    return <div className="decoder-box">
      {createDotsArray}
      </div>;
  }

  render() {
    return (
      <div className="App">
        <div className="color-selector ">
          <div onClick = {() => this.setColor(1)} className={`red-dot    dot ${this.state.selected === 1 ? "selected" : "" }`}></div>
          <div onClick = {() => this.setColor(2)} className={`blue-dot   dot ${this.state.selected === 2 ? "selected" : "" }`}></div>
          <div onClick = {() => this.setColor(3)} className={`green-dot  dot ${this.state.selected === 3 ? "selected" : "" }`}></div>
          <div onClick = {() => this.setColor(4)} className={`orange-dot dot ${this.state.selected === 4 ? "selected" : "" }`}></div>
          <div onClick = {() => this.setColor(5)} className={`yellow-dot dot ${this.state.selected === 5 ? "selected" : "" }`}></div>
          <div onClick = {() => this.setColor(6)} className={`brown-dot  dot ${this.state.selected === 6 ? "selected" : "" }`} ></div>
        </div>
        <div className="turn-bord">
          {this.state.board.map( (item,index) => {
            return (<div className="dot-container" key={index}>{item.map((arrayItem,arrayIndex)=>{
              return <div onClick = {() => this.asignColor(index,arrayIndex)}className={this.assignClasses(arrayItem)}  key={arrayIndex}></div>
            })}
              {this.decoder(index)}
            </div>)
          })}
        </div>
      </div>
    );
  }
}

export default App;
