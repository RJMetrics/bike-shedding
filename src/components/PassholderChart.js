import React, { Component } from 'react'
import IndegoData from '../data/indego.json'
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts'
import _ from 'lodash'

export default class PassholderChart extends Component {
  render() {
    const byPassholder = _.groupBy(IndegoData, "passholder_type");
    const colors = ['#8884d8', '#4fa2a8', '#2f20ad', '#9e2111'];
    let index = -1;
    // number of trips per passenger type
    const data = _.reverse(
      _.map(byPassholder, function(trips, type) {
        index += 1;
        return {
          name: type,
          number_of_trips: trips.length,
          fill: colors[index]
        }
      })
    );
    const style = {
      top: 0,
      left: 350,
      lineHeight: '24px',
      color: '#FFF'
    };

    return (
      <div className="content-area--wrapper">
        <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
          <RadialBar minAngle={15} label background clockWise={true} dataKey='number_of_trips' />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
          <Tooltip />
        </RadialBarChart>
      </div>
    )
  }
};
