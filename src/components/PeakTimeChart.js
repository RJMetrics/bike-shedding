import React, { Component } from 'react'
import IndegoData from '../data/indego.json'
import { XAxis, Tooltip, AreaChart, Area, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import FormattedDuration from './FormattedDuration'
import { formatDate } from './FormattedDate'

class TooltipContent extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      const date = label;
      const trips = payload[0].value;
      const duration = payload[1].value;

      return(
        <div className="tooltip">
          Date: {date}<br />
          Number of Trips: {trips}<br />
          Total Duration: <FormattedDuration value={duration} />
        </div>
      )
    }

    return null;
  }
}

export default class PeakTimeChart extends Component {
  render() {
    const withStartTime = _.map(IndegoData, function(trip) {
      trip.starting_hour = trip.start_time.substr(0, 13)
      return trip
    });
    const byStartTime = _.groupBy(withStartTime, 'starting_hour');
    const peakTimeData = _.map(byStartTime, function(trips, starting_hour) {
      let date = formatDate(starting_hour);
      let duration = _.sum(
        _.map(trips, function(trip) {
          return parseInt(trip.duration, 10) / 60;
        })
      );
      return {
        "Date": date,
        "Number of Trips": trips.length,
        "Total Duration": duration
      }
    });

    return (
      <div className="peak-time--wrapper">
        <ResponsiveContainer aspect={3}>
          <AreaChart data={peakTimeData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#bdf4ba" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9bf5da" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="Date" formatter={formatDate} />
            <Tooltip content={<TooltipContent />} wrapperStyle={{ width: 100, backgroundColor: '#ccc', color: '#000000' }}/>
            <Area type="monotone" dataKey="Number of Trips" stroke="#83d7be" fillOpacity={1} fill="url(#colorTrips)" activeDot={{r: 8}}/>
            <Area type="monotone" dataKey="Total Duration" stroke="#9e2111" fillOpacity={1} fill="url(#colorTrips)" activeDot={{r: 8}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
