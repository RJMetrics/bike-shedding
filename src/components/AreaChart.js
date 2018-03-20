import React, { Component } from 'react'
import IndegoDataFull from '../data/indego.json'
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts'
import moment from 'moment'
import _ from 'lodash'

export default class App extends Component {
  render() {
    const withStartTime = _.map(IndegoDataFull, function(trip) {
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
      <div className="content-area--wrapper">
        <ResponsiveContainer aspect={5}>
          <AreaChart data={peakTimeData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#83d7be" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="Date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type="monotone" dataKey="Number of Trips" stroke="#83d7be" fillOpacity={1} fill="url(#colorTrips)" activeDot={{r: 8}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
