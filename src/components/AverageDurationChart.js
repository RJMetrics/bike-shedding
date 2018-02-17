import React from 'react';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis, VictoryTheme} from 'victory';


const AverageDurationChart = props => {

  let findAverageDuration = (typeholder) => {
    let durationSum = 0;
    let counter = 0;
    props.json.forEach((ride) => {
      if (ride.passholder_type == typeholder) {
        counter += 1
        durationSum += +ride.duration
      }
    })
    let durationAverage = ( durationSum / counter ).toFixed(2);

    return durationAverage
  }

  let indego30 = findAverageDuration("Indego30");
  let walkUp = findAverageDuration("Walk-up");
  let oneDayPass = findAverageDuration("One Day Pass");
  let indegoFlex = findAverageDuration("IndegoFlex");

  let data = [
    {typeholder: "Indego30", averageDuration: +indego30, fill: "tomato" },
    {typeholder: "Walk-up", averageDuration: +walkUp, fill: "orange"},
    {typeholder: "One Day Pass", averageDuration: +oneDayPass, fill: "gold" },
    {typeholder: "IndegoFlex", averageDuration: +indegoFlex, fill: "cyan" }
  ]


  return(
    <div className="text-center">
      <div className="card bg-light mb-3 hvr-border-fade">
        <div className="card-header">Average Trip Durations</div>
        <div className="card-body">
          <VictoryChart domainPadding={30}>
            <VictoryAxis/>
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `${x} min`}
            />
            <VictoryBar
              data={data}
              x="typeholder"
              y="averageDuration"
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};

export default AverageDurationChart;
