import React from 'react';

const LABELS = {
  'date': 'Date',
  'observation_value': 'Max Temperature (F)'
}

const WeatherReportTitles = ({ titles }) => (
  <div className='WeatherReportTitles row'>
    {titles.map(title => (
      <div className='one-fourth' key={title}>{LABELS[title]}</div>
    ))}
  </div>
);

export default WeatherReportTitles;
