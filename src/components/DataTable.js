import _ from 'lodash'
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react'
import IndegoData from '../data/indego.json'
import moment from 'moment'
import React, { Component } from 'react'
import FormattedDuration from './FormattedDuration'
import FormattedDate from './FormattedDate'

class DataTable extends Component {
  render() {
    const TableLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
      <section className="data-table--wrapper">
        <span><Pagination /></span>
        <Table />
      </section>
    );
    const styleConfig = {
      classNames: {
        Row: 'row-class',
        Cell: 'grid-cell',
        Pagination: 'pagination--wrapper',
        TableHeadingCell: 'heading--cell'
      },
      styles: {
        Table: {
          width: "80vw",
          borderRadius: "11px",
          paddingTop: "20px",
          paddingBottom: "20px"
        }
      }
    };
    const sortProperties = [{ id: 'Number of Trips', sortAscending: false }];
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
        <Griddle
          components={{
            Layout: TableLayout
          }}
          styleConfig={styleConfig}
          data={peakTimeData}
          plugins={[plugins.LocalPlugin]}
          sortProperties={sortProperties}
        >
          <RowDefinition>
            <ColumnDefinition id="Date" order={1} customComponent={FormattedDate} />
            <ColumnDefinition id="Number of Trips" order={2} />
            <ColumnDefinition id="Total Duration" order={3} customComponent={FormattedDuration} />
          </RowDefinition>
        </Griddle>
    );
  }
}

export default DataTable;
