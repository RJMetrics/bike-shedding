import React, { Component } from 'react'
import IndegoData from '../data/indego.json'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import { formatDate } from './FormattedDate'

const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

const renderTooltipContent = (o) => {
	const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);

  return (
  	<div className="customized-tooltip-content">
    	<p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
      	{
        	payload.map((entry, index) => (
          	<li key={`item-${index}`} style={{color: entry.color}}>
            	{`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default class PassholderChart extends Component {
  render() {
    const withStartTime = _.map(IndegoData, function(trip) {
      trip.starting_hour = trip.start_time.substr(0, 13)
      return trip
    });
    const byStartTime = _.groupBy(withStartTime, 'starting_hour');
    const byPassholder = _.map(byStartTime, function(trips, date) {
      let groupedByPassholder = _.groupBy(trips, 'passholder_type');
      let formattedDate = formatDate(date);
      let result = {
        "Date": formattedDate,
        "Indego30": 0,
        "Walk-up": 0,
        "IndegoFlex": 0,
        "One Day Pass": 0
      };

      _.each(groupedByPassholder, function(trips, passholderType) {
        result[passholderType] = trips.length;
      })

      return result
    });


    return (
      <div className="passholder--wrapper">
        <ResponsiveContainer>
          <AreaChart width={600} height={400} data={byPassholder} stackOffset="expand"
                margin={{top: 10, right: 30, left: 0, bottom: 0}} >
            <XAxis dataKey="Date" stroke="#FFFFFF" formatter={formatDate} />
            <YAxis stroke="#FFFFFF" tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Area type='monotone' dataKey='Indego30' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='Walk-up' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            <Area type='monotone' dataKey='One Day Pass' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='IndegoFlex' stackId="1" stroke='#9c0ed5' fill='#9c0ed5' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
};
