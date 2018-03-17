import React, { Component } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import IndegoData from './data/indego.json'
import _ from 'lodash'
import './styles/css/App.css'

class App extends Component {
  render() {
    const byPassholder = _.groupBy(IndegoData, "passholder_type");
    const data = _.map(byPassholder, function(trips, type) {
      return {
        passholder_type: type,
        number_of_trips: trips.length
      }
    });
    return (
      <main className="App">
        <div className="content-area content-area-one"/>
        <div className="content-area content-area-two"/>
        <div className="content-area content-area-three"/>

        <BarChart width={600} height={300} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="passholder_type"/>
           <YAxis dataKey="number_of_trips"/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="number_of_trips" fill="#82ca9d" />
        </BarChart>
      </main>
    );
  }
}

export default App;
