import React from 'react';
import BikeRideColumn from './BikeRideColumn';

const BikeRideRow = ({ ride, titles }) => (
  <div className='BikeRideRow row'>
    {titles.map(title => (
      <div className='one-sixth' key={`${ride.id}-${title}`}>
        <BikeRideColumn ride={ride} title={title} />
      </div>
    ))}
  </div>
);

export default BikeRideRow;
