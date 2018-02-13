import React from 'react';
import './BikeRideTitles.css';

const LABELS = {
  'duration': 'Duration',
  'start_time': 'Start Time',
  'start_station': 'Start Station',
  'end_station': 'End Station',
  'bike_id': 'Bike ID',
  'trip_route_category': 'Trip Type',
}

const BikeRideTitles = ({ titles }) => (
  <div className='BikeRideTitles row'>
    {titles.map(title => (
      <div className='small-column' key={title}>{LABELS[title]}</div>
    ))}
  </div>
);

export default BikeRideTitles;
