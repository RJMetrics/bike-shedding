import React, { Component } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts'
import IndegoData from './data/october_indego.json'
import _ from 'lodash'
import moment from 'moment'
import './styles/css/App.css'

class App extends Component {
  render() {
    const withStartTime = _.map(IndegoData, function(trip) {
      trip.starting_hour = trip.start_time.substr(0, 13)
      return trip
    });
    const byStartTime = _.groupBy(withStartTime, 'starting_hour');
    const peakTimeData = _.map(byStartTime, function(trips, starting_hour) {
      return {
        "Date": moment(starting_hour).format("MMM Do @ ha"),
        "Number of Trips": trips.length
      }
    });

    return (
      <main className="App">
      	<ResponsiveContainer width="90%" height="60%" className="content-area--wrapper">
          <AreaChart data={peakTimeData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type="monotone" dataKey="Number of Trips" stroke="#8884d8" fillOpacity={1} fill="url(#colorTrips)" activeDot={{r: 8}}/>
          </AreaChart>
      	</ResponsiveContainer>
      </main>
    );
  }
}

export default App;
