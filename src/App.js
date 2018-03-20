import './styles/css/App.css'
import AreaChart from './components/AreaChart'
import DataTable from './components/DataTable'
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <main className="App">
        <AreaChart/>
        <DataTable/>
      </main>
    );
  }
}

export default App;
