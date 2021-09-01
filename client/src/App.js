import './App.css';
import React, { Component } from 'react'

class App extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.fetchText()
  }
  fetchText = async () => {
    const response = await fetch('/api/getText')
    console.log(response)
    const init = await response.json()
    this.setState(init)
  }
  render() {
    return (
      <div className="App">
        <p>in client get { this.state.text }!!!</p>
      </div>
    );
  }
}

export default App
