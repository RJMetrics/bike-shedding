import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react'
import IndegoData from '../data/indego.json'
import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'

class DateColumn extends Component {
  render() {
    const date = moment(this.props.value);
    const formattedDate = date.format('MMM Do @ ha');

    return(
      <span>{formattedDate}</span>
    )
  }
}


class DurationColumn extends Component {
  render() {
    const hours = Math.floor(this.props.value / 60);
    const minutes = this.props.value % 60;
    const formattedDuration = (hours > 0) ? `${hours}h ${minutes}m` : `${minutes}m`;

    return(
      <span>{formattedDuration}</span>
    )
  }
}

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
        Table: { width: "84vw", background: "#FFFFFF", paddingTop: "20px", paddingBottom: "20px" }
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
          return parseInt(trip.duration);
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
            <ColumnDefinition id="Date" order={1} customComponent={DateColumn} />
            <ColumnDefinition id="Number of Trips" order={2} />
            <ColumnDefinition id="Total Duration" order={3} customComponent={DurationColumn} />
          </RowDefinition>
        </Griddle>
    );
  }
}

export default DataTable;
