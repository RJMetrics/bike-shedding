import React from 'react';
import { VictoryPie } from 'victory';

const PieChart = props => {

  let findPercentage = (typeholder) => {
    let dataSize = props.json.length;
    let sum = 0;
    props.json.forEach((ride) => {
      if (ride.passholder_type == typeholder) {
        sum += 1
      }
    })
    let percentage = sum / dataSize

    return Math.ceil(percentage * 100)
  }

  let indego30 = findPercentage("Indego30");
  let walkUp = findPercentage("Walk-up");
  let oneDayPass = findPercentage("One Day Pass");
  let indegoFlex = findPercentage("IndegoFlex");


  return(
    <div className="text-center">
      <div className="card bg-light mb-3 hvr-border-fade">
        <div className="card-header">Trips Taken this Quarter</div>
        <div className="card-body">
          <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
            data={[
              { x: `Indego30`, y: indego30 },
              { x: `Walk-Up`, y: walkUp },
              { x: `One Day Pass`, y: oneDayPass},
              { x: `IndegoFlex`, y: indegoFlex }
            ]}
            width={450}
            height={450}
            padAngle={12}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
