import './styles/css/App.css'
import PeakTimeChart from './components/PeakTimeChart'
import PassholderChart from './components/PassholderChart'
import DataTable from './components/DataTable'
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <main className="App">
        <div className="dashboard--wrapper">
          <PeakTimeChart/>
          <PassholderChart/>
          <DataTable/>
        </div>
      </main>
    );
  }
}

export default App;
