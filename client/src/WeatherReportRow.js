import React from 'react';

const WeatherReportRow = ({ weatherReport, titles }) => {
  const tempInTenthOfDegreesC = weatherReport.observation_value;
  const tempInDegreesF = (tempInTenthOfDegreesC * .18) + 32;
  return (
    <div>
      {/* {titles.map(title => ( */}
        <div className='one-fourth'>
          {weatherReport.date}
        </div>
        <div className='one-fourth'>
          {tempInDegreesF}
        </div>
      {/* ))} */}
    </div>
  );
}

export default WeatherReportRow;
