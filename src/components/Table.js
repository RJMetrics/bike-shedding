import React from 'react';
import ReactTable from 'react-table';

const Table = props => {
  let data = props.json.map((ride) => {
    ride.duration = +ride.duration
    return ride
  })

  let columns = [{
    Header: 'Trip ID',
    accessor: 'trip_id'
  },{
    Header: 'Duration (Min)',
    accessor: 'duration'
  },{
    Header: 'Passholder Type',
    accessor: 'passholder_type'
  }]

  return(
    <div>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={5}
        getTrProps={(state, rowInfo, column) => {
          return {
            style: {
              background: (rowInfo.row.duration > 30 && rowInfo.row.passholder_type === "Walk-up")
              || (rowInfo.row.duration > 60 && rowInfo.row.passholder_type === "Indego30")
              || (rowInfo.row.duration > 60 && rowInfo.row.passholder_type === "IndegoFlex")
              || (rowInfo.row.duration > 30 && rowInfo.row.passholder_type === "One Day Pass")
               ? '#98FB98' : '#ffffff'
            }
          }
        }}
      />
      <div className="table-information">
        Rides where typeholders are charged extra for going above their initial allotted time are in green.
      </div>
    </div>
  );
};

export default Table;
