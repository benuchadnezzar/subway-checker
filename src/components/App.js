import React, { Component } from 'react';
import SubCheck from './SubCheck';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subways: [
        {id: 1, line: 'L'},
        {id: 2, line: 'M'},
        {id: 3, line: 'G'},
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Subway Checker</h1>
        <SubCheck subways={this.state.subways}/>
      </div>
    );
  }
}

export default App;
