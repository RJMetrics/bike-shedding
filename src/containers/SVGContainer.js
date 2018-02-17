import React from 'react';
import PieChart from '../components/PieChart';
import AverageDurationChart from '../components/AverageDurationChart';

class SVGContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return(
      <div>
        <AverageDurationChart json={this.props.json} />
        <PieChart json={this.props.json}/>
      </div>
    );
  }
};

export default SVGContainer;
