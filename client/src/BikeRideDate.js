import React from 'react';
import moment from 'moment';

const BikeRideDate = ({ value }) => (
  <span>
    {moment(value).format('h:mm a')}
  </span>
);

export default BikeRideDate;
