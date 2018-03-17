import React, { Component } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'
import IndegoData from './data/indego.json'
import _ from 'lodash'
import moment from 'moment'
import './styles/css/App.css'

class App extends Component {
  render() {
    // const byPassholder = _.groupBy(IndegoData, "passholder_type");

    // Lets group by start time instead of passholder type
    let byStartTime = _.map(IndegoData, function(trip) {
      trip.start_time = trip.start_time.substr(0, 13)
      return trip
    });
    byStartTime = _.groupBy(byStartTime, 'start_time');

    const peakTimeData = _.map(byStartTime, function(trips, start_time) {
      return {
        start_time: moment(start_time).format("MMM Do, h a"),
        "Number of Trips": trips.length
      }
    });
    return (
      <main className="App">
        <LineChart className={"content-area content-area-one"} width={600} height={300} data={peakTimeData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="start_time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Line type="monotone" dataKey="Number of Trips" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>
      </main>
    );
  }
}

export default App;
