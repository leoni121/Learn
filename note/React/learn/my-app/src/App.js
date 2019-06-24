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
    return <h1>网站地址：{this.props.nickname}</h1>;
  }
}

function App() {
  return (
    <div>
      <Name/>
      <Url/>
      <Nickname/>
    </div>
  )
}

export default App;