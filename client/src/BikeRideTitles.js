import React from 'react';

const LABELS = {
  'duration': 'Duration (min)',
  'start_time': 'Start Time',
  'start_station': 'Start Station',
  'end_station': 'End Station',
  'bike_id': 'Bike ID',
  'plan_duration': 'Plan Duration',
  'trip_route_category': 'Trip Type',
}

const BikeRideTitles = ({ titles }) => (
  <div className='BikeRideTitles row'>
    {titles.map(title => (
      <div className='one-sixth' key={title}>{LABELS[title]}</div>
    ))}
  </div>
);

export default BikeRideTitles;
