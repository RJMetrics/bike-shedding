import React, { Component } from 'react';
import Graph from './Graph';
import ChartPanel from './ChartPanel';
import sortWeatherByTemperature from './sorters/sortWeatherByTemperature';
import sortRecordByDate from './sorters/sortRecordByDate';
import sortByDate from './sorters/sortByDate';

class GraphData extends Component {
  state = {
    ridesByDay: null,
    countsByDay: null,
    weatherReports: null,
    dates: null,
    selectedValues: null,
    selectedDate: null,
  }

  fetchBikeRides = () => {
    fetch('api/bike_rides?=&count=true')
      .then(response => response.json())
      .then(json => {
        const sortedDates = Object.keys(json).sort(sortByDate);

        this.setState({
          countsByDay: json,
          selectedDate: sortedDates[0],
          dates: sortedDates,
        });
      })
      .catch(ex => {
        console.log("Couldn't fetch bike rides: ", ex);
      });
  }

  fetchBikeRidesByDay = (date) => {
    const that = this;
    fetch(`api/bike_rides?=&date=${date}`)
      .then(response => response.json())
      .then(json => {
        // Make a new copy of the state. Now we mutate!
        const newBikeRideState = this.state.ridesByDay || {};
        // Sort each bike ride into arrays keyed on date.
        // { "12-21-17": [{ bikeRide }, { bikeRide } ...] }
        json.forEach(item => {
          const stateForDate = newBikeRideState[item.date];
          if (stateForDate && stateForDate.find(ride => ride.id === item.id)) {
            // The bike ride has already been fetched, no need to add it.
            return;
          } else {
            // Add it to the collection.
            if (stateForDate) {
              newBikeRideState[item.date].push(item)
            } else {
              newBikeRideState[item.date] = [];
            }
          }
        });
        that.setState({
          ridesByDay: newBikeRideState,
        });
      })
      .catch(ex => {
        console.log("Couldn't fetch bike rides by day: ", ex);
      });
  }

  fetchWeatherReports = () => {
    fetch('api/weather_reports')
      .then(response => response.json())
      .then(json => {
        // Sort by date and temperature ...
        // We have to slice to create a copy because .sort mutates the
        // original array and things get real weird, real fast.
        const sortedWeatherReports = {
          byDate: json.slice().sort(sortRecordByDate),
          byTemperature: json.slice().sort(sortWeatherByTemperature),
        };
        this.setState({ weatherReports: sortedWeatherReports })
      })
      .catch(ex => {
        console.log('Something went wrong: ', ex);
      });
  }

  onDateSelect = (data) => {
    const index = data.x;
    const date = this.state.dates[index];
    this.setState({
      selectedDate: date,
    });
    this.fetchBikeRidesByDay(date);
  }

  onDateMouseOver = ({ x, y }) => {
    this.setState({
      selectedValues: { x, y },
    });
    console.log('selectedValues: ', { x, y });
  }

  componentDidMount () {
    this.fetchBikeRides();
    this.fetchWeatherReports();
  }

  render(){
    const { ridesByDay, selectedDate, countsByDay, weatherReports, selectedValues } = this.state;
    const selectedRides = selectedDate && ridesByDay && ridesByDay[selectedDate];
    const weatherReport = selectedDate && weatherReports &&
      weatherReports[this.props.view].find(report => report.date === selectedDate);

    return (
      <div>
        {countsByDay && weatherReports && (
          <Graph
            dates={this.state.dates}
            view={this.props.view}
            weatherReports={weatherReports[this.props.view]}
            countsByDay={countsByDay}
            onValueMouseOver={this.onDateMouseOver}
            onValueClick={this.onDateSelect}
            selectedDate={selectedDate}
            selectedValues={selectedValues}
          />
        )}
        {selectedDate && (
          <ChartPanel
            weatherReport={weatherReport}
            selectedDate={selectedDate}
            bikeRides={selectedRides}
            fetchBikeRidesByDay={this.fetchBikeRidesByDay}
          />
        )}
      </div>
    );
  }
};

export default GraphData;
