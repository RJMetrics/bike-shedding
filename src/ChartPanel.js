import React from 'react';
import BikeRidesChart from './BikeRidesChart';
import WeatherReportChart from './WeatherReportChart';
import './ChartPanel.css';

const ChartPanel = ({ selectedDate, weatherReport, bikeRides, fetchBikeRidesByDay }) => (
  <div className='ChartPanel'>
    {weatherReport && (
      <WeatherReportChart
        weatherReport={weatherReport}
      />
    )}
    <BikeRidesChart
      selectedDate={selectedDate}
      fetchBikeRidesByDay={fetchBikeRidesByDay}
      bikeRides={bikeRides}
    />
  </div>
);

export default ChartPanel;
