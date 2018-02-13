import React from 'react';
import { DiscreteColorLegend } from 'react-vis';

const TITLES=['Indego30', 'Walk-up', 'IndegoFlex', 'One Day Pass', 'Indego365'];
const COLORS=['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'];
const ChartLegend = () => (
  <DiscreteColorLegend
    items={TITLES.map((title, index) => ({
      title: title,
      color: COLORS[index],
    }))}
    orientation='horizontal'
  />
);

export default ChartLegend;
