import React from 'react';
import WeatherReportRow from './WeatherReportRow';
import WeatherReportTitles from './WeatherReportTitles';
import './WeatherReportChart.css';

const TITLES = [
  'date',
  'observation_value',
];

const WeatherReportChart = ({ weatherReport }) => (
  <div className='WeatherReportChart container'>
    <WeatherReportTitles titles={TITLES} />
    <WeatherReportRow weatherReport={weatherReport} titles={TITLES} />
  </div>
);

export default WeatherReportChart;
