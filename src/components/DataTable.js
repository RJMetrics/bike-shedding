import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react'
import IndegoData from '../data/indego.json'
import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'

class DataTable extends Component {
  render() {
    const CustomColumn = ({value}) => <span style={{ color: '#0000AA' }}>{value}</span>;
    const CustomHeading = ({title}) => <span style={{ color: '#AA0000' }}>{title}</span>;
    const TableLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
      <section className="data-table">
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
        Table: { background: "white", border: "2px solid #555 ", borderRadius: "20px", padding: "20px" }
      }
    };
    const sortProperties = [{ id: 'Number of Trips', sortAscending: false }];
    const IndegoDataWithIndex = _.map(IndegoData, function(trip, index) {
      trip.ride_number = index + 1;
      return trip
    });
    const withStartTime = _.map(IndegoData, function(trip) {
      trip.starting_hour = trip.start_time.substr(0, 13)
      return trip
    });

    return (
        <Griddle
          components={{
            Layout: TableLayout
          }}
          styleConfig={styleConfig}
          data={IndegoDataWithIndex}
          plugins={[plugins.LocalPlugin]}
          sortProperties={sortProperties}
        >
          <RowDefinition>
            <ColumnDefinition id="ride_number" order={1} width={150} />
            <ColumnDefinition id="duration" order={2} width={150} />
            <ColumnDefinition id="start_time" order={3} width={150} />
            <ColumnDefinition id="end_time" order={4} width={150} />
          </RowDefinition>
        </Griddle>
    );
  }
}

export default DataTable;
