import React from 'react';
import BikeRideDate from './BikeRideDate';
import TripRouteCategory from './TripRouteCategory';

const components = {
  start_time: BikeRideDate,
  trip_route_category: TripRouteCategory,
};

const BikeRideColumn = ({ ride, title }) => {
  if (components[title]) {
    const ComponentName = components[title];
    return (<ComponentName value={ride[title]} />);
  } else {
    return (<span>{ride[title]}</span>);
  }
};

export default BikeRideColumn;
