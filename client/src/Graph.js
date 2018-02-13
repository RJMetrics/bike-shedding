import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import './Graph.css';
import moment from 'moment';
import { Hint } from 'react-vis';
// import debounce from 'lodash.debounce';

import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

class Graph extends Component {
  onValueClick = (data, event) => {
    this.props.onValueClick(data);
  }

  onValueMouseOver = (data, event) => {
    this.props.onValueMouseOver(data);
  }

  tickFormat = (index) => {
    const { dates, weatherReports, view } = this.props;
    if (view === 'byDate') {
      return moment(dates[index]).format('MM-D');
    }
    // Convert from tenths of degrees C to F and round to a whole number.
    const tempInC = weatherReports[index].observation_value;
    return this.toFahrenheitString(tempInC);
  }

  toFahrenheitString = (num) => (
    Math.round(num * .18 + 32).toString() + '°'
  );

  hintFormat = ({ x, y, color }) => {
    const report = this.props.weatherReports.find(report => report.date === this.props.dates[x]);
    return ([{
      title: `${moment(this.props.dates[x]).format('MMMM DD')}`,
      value: this.toFahrenheitString(report.observation_value),
    }]);
  };

  render() {
    const {
      countsByDay,
      selectedValues,
      weatherReports,
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
            onValueMouseOver={this.onValueMouseOver}
            // animation={'noWobble'} // So sad: the Hint component clobbers
            // onValueClick when the animation is on. react-vis says this is fixed,
            // but I don't believe them. https://github.com/uber/react-vis/issues/510
          />
          {selectedValues && (
            <Hint
              value={selectedValues}
              format={this.hintFormat}
              orientation='topleft'
            />
          )}
          <XAxis
            tickFormat={this.tickFormat}
            tickLabelAngle={-45}
          />
          <YAxis />
        </XYPlot>
      </div>
    )
  }
};

export default Graph;
