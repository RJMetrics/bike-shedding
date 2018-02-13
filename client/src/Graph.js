import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import './Graph.css';
import moment from 'moment';

// import Popover from './Popover';
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

class Graph extends Component {
  onValueClick = (data, event) => {
    this.props.onValueClick(data);
  };

  onValueMouseOver = (data, event) => {
    this.props.onValueMouseOver(data);
  };

  tickFormat = (index) => {
    const { dates, weatherReports, view } = this.props;
    if (view === 'byDate') {
      return moment(dates[index]).format('MM-D');
    }
    return Math.round(weatherReports[index].observation_value * .18 + 32).toString() + '°';
  };

  render() {
    const {
      weatherReports,
      countsByDay,
      view,
      selectedValues,
    } = this.props;

    const data = weatherReports.map((report, index) => ({
      x: index, // The index
      y: countsByDay[report.date], // The number of bike rides that day
      color: parseInt(report.observation_value, 10), // The temperature.
    }));

    return (
      <div className='Graph'>
        <XYPlot height={300} width={900} colorRange={['#181c72', '#e8e8ed']}>
          <VerticalBarSeries
            data={data}
            onValueClick={this.onValueClick}
            // onValueMouseOver={debounce(this.onValueMouseOver, 500)}
            animation={'noWobble'}
          />
          {/* {selectedValues && (
            <Popover value={selectedValues}/>
          )} */}
          <XAxis tickFormat={this.tickFormat} tickLabelAngle={-45}/>
          <YAxis />
        </XYPlot>
      </div>
    )
  }
};

export default Graph;
