import React, { Component } from 'react'
import { XAxis, Tooltip, AreaChart, Area, Legend, ResponsiveContainer } from 'recharts'
import FormattedDuration from './FormattedDuration'
import FormattedDate, { formatDate } from './FormattedDate'
import { peakTimeData } from '../utils/Queries'

class PeakTimeTooltipContent extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      const date = label;
      const trips = payload[0].value;
      const duration = payload[1].value;

      return(
        <div className="chart--tooltip">
          Date: <FormattedDate value={date} /><br />
          Number of Rides: {trips}<br />
          Total Time Traveled: <FormattedDuration value={duration} />
        </div>
      )
    }

    return null;
  }
}

export default class PeakTimeChart extends Component {
  render() {
    return (
      <div className="peak-time--wrapper">
        <div className="chart--heading">
          <h2>Peak Rides Per Hour</h2>
          <h4>October 1-4, 2017</h4>
        </div>
        <ResponsiveContainer>
          <AreaChart data={peakTimeData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <defs>
              <linearGradient id="colorTrips" x1="50%" y1="0%" x2="50%" y2="47.2217793%">
                <stop stop-color="#1CF2F0" offset="0%" stopOpacity={.6}/>
                <stop stop-color="#0CE18A" offset="100%" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <defs>
              <radialGradient id="colorTrips2" cx="48.4470411%" cy="91.1412806%" fx="48.4470411%" fy="91.1412806%" r="293.718625%" gradientTransform="translate(0.484470,0.911413),scale(0.205460,1.000000),rotate(-167.489859),scale(1.000000,0.807806),translate(-0.484470,-0.911413)">
                <stop stop-color="#D5BDEF" offset="0%" stopOpacity={0.8}></stop>
                <stop stop-color="#B03DFF" offset="100%" stopOpacity={.6}></stop>
              </radialGradient>
            </defs>
            <XAxis dataKey="Date" stroke="#FFFFFF" tickMargin={10} tickFormatter={formatDate}  />
            <Tooltip
              content={<PeakTimeTooltipContent />}
            />
            <Legend
              wrapperStyle={{
                color: "#FFFFFF",
                paddingTop: "10px"
              }}
            />
            <Area type="monotone" dataKey="Number of Rides" stroke="#0CE18A"
              fillOpacity={1} fill="url(#colorTrips)" activeDot={{r: 0}}/>
            <Area type="monotone" dataKey="Total Time Traveled" stroke="#B03DFF"
              fillOpacity={1} fill="url(#colorTrips2)" activeDot={{r: 0}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
