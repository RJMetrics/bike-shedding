import React, { Component } from 'react'
import { LineChart, Line } from 'recharts'
import IndegoData from './data/indego.json'
import _ from 'lodash'
import './styles/css/App.css'

class App extends Component {
  render() {
    return (
      <main className="App">
        <div className="content-area content-area-one"/>
        <div className="content-area content-area-two"/>
        <div className="content-area content-area-three"/>

        <LineChart width={400} height={400}>
          <Line type="monotone" stroke="#8884d8" />
        </LineChart>
      </main>
    );
  }
}

export default App;
