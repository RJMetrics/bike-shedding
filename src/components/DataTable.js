import _ from 'lodash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IndegoData from '../data/indego.json'
import moment from 'moment'
import React, { Component } from 'react'
import FormattedDuration from './FormattedDuration'
import FormattedDate from './FormattedDate'

class DataTable extends Component {
  render() {
    const withStartTime = _.map(IndegoData, function(trip) {
      trip.starting_hour = trip.start_time.substr(0, 13)
      return trip
    });
    const byStartTime = _.groupBy(withStartTime, 'starting_hour');
    const peakTimeData = _.map(byStartTime, function(trips, starting_hour) {
      let timestamp = moment(starting_hour).valueOf();
      let duration = _.sum(
        _.map(trips, function(trip) {
          return parseInt(trip.duration, 10);
        })
      );

      return {
        "Date": timestamp,
        "Number of Trips": trips.length,
        "Total Duration": duration
      }
    });

    return (
        <ReactTable
          data={peakTimeData}
          columns={[
            {
              Header: 'Date',
              accessor: 'Date',
              Cell: (row) => <FormattedDate value={row.value} />,
              width: 200,
              style: {
                cursor: "pointer",
                fontSize: 18,
                padding: "10",
                textAlign: "center",
                userSelect: "none"
              },
            },
            {
              Header: 'Number of Trips',
              accessor: 'Number of Trips',
              width: 200
            },
            {
              Header: 'Hours of Travel',
              accessor: 'Total Duration',
              width: 200,
              Cell: (row) => <FormattedDuration value={row.value} />
            }
          ]}
          defaultPageSize={10}
          className="data-table--wrapper -highlight"
        />
    );
  }
}

export default DataTable;
