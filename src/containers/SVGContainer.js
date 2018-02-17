import React from 'react';
import PieChart from '../components/PieChart';
import AverageDurationChart from '../components/AverageDurationChart';

const SVGContainer = props => {
  return(
    <div>
      <AverageDurationChart json={props.json} />
      <PieChart json={props.json}/>
    </div>
  );
};

export default SVGContainer;
