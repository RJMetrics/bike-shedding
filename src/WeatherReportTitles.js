import React from 'react';
import './WeatherReportTitles.css';

const LABELS = {
  'date': 'Date',
  'observation_value': 'Max Temp (F)'
}

const WeatherReportTitles = ({ titles }) => (
  <div className='WeatherReportTitles row'>
    {titles.map(title => (
      <div className='medium-column' key={title}>{LABELS[title]}</div>
    ))}
  </div>
);

export default WeatherReportTitles;
