import _ from 'lodash'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
import React, { Component } from 'react'
import FormattedDuration from './FormattedDuration'
import FormattedDate from './FormattedDate'
import { byStartTime } from '../utils/Queries'

class DataTable extends Component {
  render() {
    const peakTimeData = _.map(byStartTime, function(trips, starting_hour) {
      let timestamp = moment(starting_hour).valueOf();
      let duration = _.sum(
        _.map(trips, function(trip) {
          return parseInt(trip.duration, 10);
        })
      );

      return {
        "Date": timestamp,
        "Number of Rides": trips.length,
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
            },
            {
              Header: 'Number of Rides',
              accessor: 'Number of Rides',
            },
            {
              Header: 'Time Traveled',
              accessor: 'Total Duration',
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
