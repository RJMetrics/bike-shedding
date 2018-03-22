import _ from 'lodash'
import IndegoData from '../data/indego.json'

export const withStartTime = _.map(IndegoData, function(trip) {
  trip.starting_hour = trip.start_time.substr(0, 13)
  return trip
});

export const byStartTime = _.groupBy(withStartTime, 'starting_hour');

export const byPassholder = _.map(byStartTime, function(trips, starting_hour) {
  let groupedByPassholder = _.groupBy(trips, 'passholder_type');
  let result = {
    "Date": starting_hour,
    "Indego30": 0,
    "Walk-up": 0,
    "IndegoFlex": 0,
    "One Day Pass": 0
  };

  _.each(groupedByPassholder, function(trips, passholderType) {
    result[passholderType] = trips.length;
  });

  return result
});

export const peakTimeData = _.map(byStartTime, function(trips, starting_hour) {
  let hoursOfEachTrip = _.map(trips, function(trip) {
    return parseInt(trip.duration, 10) / 60;
  })
  let duration = _.sum(hoursOfEachTrip);

  return {
    "Date": starting_hour,
    "Number of Rides": trips.length,
    "Total Time Traveled": duration
  }
});
