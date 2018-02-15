import React, { Component } from 'react';
import BikeRideRow from './BikeRideRow';
import BikeRideTitles from './BikeRideTitles';
import './BikeRidesChart.css';

const TITLES = [
  'duration',
  'start_time',
  'start_station',
  'end_station',
  'bike_id',
  'trip_route_category',
];

class BikeRidesChart extends Component {
  componentDidMount() {
    const { fetchBikeRidesByDay, selectedDate } = this.props;
    fetchBikeRidesByDay(selectedDate);
  }

  render() {
    return (
      <div className='BikeRidesChart container'>
        {this.props.bikeRides && <BikeRideTitles titles={TITLES} />}
        {this.props.bikeRides && this.props.bikeRides.map(ride => (
          <BikeRideRow ride={ride} titles={TITLES} key={ride.id} />
        ))}
      </div>
    );
  }
};

export default BikeRidesChart;
