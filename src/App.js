import React, { Component } from 'react';
import './App.css';



class App extends Component {
  state = {
    board : [],
    turn : 0,
    selected : 1,
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
    const tempArray = this.state.board.concat();
    tempArray[outerArrayIndex][innerArrayIndex] = this.state.selected;
    this.setState({board:tempArray})
  }

  setColor = (colorApp) => {
    this.setState({selected:colorApp})
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
            </div>)
          })}
        </div>
      </div>
    );
  }
}

export default App;
