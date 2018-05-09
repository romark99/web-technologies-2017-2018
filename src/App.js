import React, { Component } from 'react';
import './App.css';
import './Components/icon.js'
import PicText from "./Components/picText";

class App extends Component {
  render() {
    return (
      <PicText icon="arrow-left" text="Hello"/>
    );
  }
}

export default App;
