import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class NzqTry extends Component{
  constructor (props) {
    super(props);
    this.state = {
      user: '',
      lastGistUrl: ''
    };
  }

  componentDidMount() {
    this.setState({
      username: 'nzq',
      lastGistUrl: 'https://www.baidu.com/',
    })
  }

  render() {
    return (
      <div>
        {this.state.username} 打算的撒
        <a href={this.state.lastGistUrl}>{this.state.lastGistUrl}</a>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <footer>
          <NzqTry/>
        </footer>
      </div>
    );
  }
}

export default App;
