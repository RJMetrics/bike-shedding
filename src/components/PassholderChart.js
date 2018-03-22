import React, { Component } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatDate, formatFullDate } from './FormattedDate'
import { byPassholder } from '../utils/Queries'
import { getPercent, toPercent } from '../utils/FindPercent'

class PassholderTooltipContent extends Component {
	render() {
		const { payload, label } = this.props;
	  const total = payload.reduce((result, entry) => (result + entry.value), 0);
		const date = formatFullDate(label);

	  return (
	  	<div className="chart--tooltip">
	    	<p className="total">{`${date} (Total: ${total})`}</p>
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
	}
}

export default class PassholderChart extends Component {
  render() {
    return (
      <div className="passholder--wrapper">
				<div className="chart--heading">
	      	<h2>Percentage of Riders by Passenger Type</h2>
					<h4 className="passholder--summary">
						The majority of your riders held Indego30 passes.
					</h4>
				</div>
				<div className="passholder--chart">
					<ResponsiveContainer>
	          <AreaChart width={600} height={400} data={byPassholder} stackOffset="expand"
	                margin={{top: 10, right: 30, left: 0, bottom: 0}} >
	            <XAxis dataKey="Date" stroke="#FFFFFF" tickFormatter={formatDate} padding={{ left: 10 }} minTickGap={30} />
	            <YAxis stroke="#FFFFFF" tickFormatter={toPercent}/>
	            <Tooltip
								wrapperStyle={{
									width: 250,
	                borderRadius: '8px',
	                textAlign: 'center',
	                fontSize: '20px',
	                backgroundColor: '#05122a',
	                color: '#ffffff'
								}}
								content={<PassholderTooltipContent />}
							/>
							<Legend
	              wrapperStyle={{
	                color: "#FFFFFF",
	                paddingTop: "10px"
	              }}
	            />
	            <Area type='monotone' dataKey='Indego30' stackId="1" stroke='#83cdd7' fill='#83cdd7' />
	            <Area type='monotone' dataKey='Walk-up' stackId="1" stroke='#49f188' fill='#49f188' />
	            <Area type='monotone' dataKey='One Day Pass' stackId="1" stroke='#ffd686' fill='#ffd686' />
	            <Area type='monotone' dataKey='IndegoFlex' stackId="1" stroke='#e2adff' fill='#e2adff' />
	          </AreaChart>
					</ResponsiveContainer>
				</div>
      </div>
    )
  }
};
