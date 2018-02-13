import React, { Component } from 'react';
import Button from './Button';
import GraphData from './GraphData';
import { ContinuousColorLegend } from 'react-vis';

const VIEW_BY_DATE = 'byDate';
const VIEW_BY_TEMPERATURE = 'byTemperature';
const VIEW_OPTIONS = [VIEW_BY_DATE, VIEW_BY_TEMPERATURE];
const viewLabels = {
  [VIEW_BY_DATE]: 'By Date',
  [VIEW_BY_TEMPERATURE]: 'By Temperature',
};

class GraphPanel extends Component {
  state = { graphView: 'byDate' }

  onButtonClick = (value) => (event) => {
    this.setState({ graphView: value });
  }

  render(){
    return (
      <div className='GraphPanel'>
        <div className='ButtonBar'>
          Sort by:
          {VIEW_OPTIONS.map(option => (
            <Button
              onClick={this.onButtonClick(option)}
              selected={this.state.graphView === option}
              key={option}
            >
              {viewLabels[option]}
            </Button>
          ))}
          <ContinuousColorLegend
            startColor='#e8e8ed'
            endColor='#181c72'
            startTitle='warmer'
            endTitle='cold'
          />
        </div>
        <GraphData
          view={this.state.graphView}
        />
      </div>
    );
  }
};

export default GraphPanel;
