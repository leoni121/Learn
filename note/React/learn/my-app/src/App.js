import React from 'react';
import logo from './logo.svg';
import './App.css';

var myStyle = {
  color: 'red',
  textAlign: 'center'
}

let arr = [
  <div> nzq </div>,
  <div> wx </div>
]

class Name extends React.Component {
  render() {
    return <h1 style={myStyle}>网站名称：{arr}</h1>;
  }
}
class Url extends React.Component {
  render() {
    return <h1>网站地址：{this.props.url}</h1>;
  }
}
class Nickname extends React.Component {
  render() {
    return <h1 style={{fontSize: 100}}>网站地址：{this.props.nickname}</h1>;
  }
}

class FormatteDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
    }
  }
  render() {
    return <h2>现在是　{this.props.date.toLocaleTimeString()}</h2>
  }
}

function FormatteDate1(props) {
  return <h2>现在是　{props.date.toLocaleTimeString()}</h2>
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h1>
          hello, world!
        </h1>
        <h2>
          <FormatteDate date={this.state.date} />
        </h2>
      </div>
    )
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(preState => ({
      isToggleOn: !preState.isToggleOn,
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'on':'off'}
      </button>
    )
  }
}

function App() {
  return (
    /*  */
    <div>
      {/**/}
      <Name/>
      <Url/>
      <Nickname/>
      <Clock/>
      <Toggle/>
    </div>
  )
}

export default App;