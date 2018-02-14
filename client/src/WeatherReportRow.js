import React from 'react';

const WeatherReportRow = ({ weatherReport, titles }) => {
  const tempInTenthOfDegreesC = weatherReport.observation_value;
  const tempInDegreesF = (tempInTenthOfDegreesC * .18) + 32;
  return (
    <div>
      <div className='small-column'>
        {weatherReport.date}
      </div>
      <div className='small-column'>
        {tempInDegreesF}
      </div>
    </div>
  );
}

export default WeatherReportRow;
