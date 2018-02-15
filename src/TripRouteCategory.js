import React from 'react';
import './TripRouteCategory.css';
import ReactTooltip from 'react-tooltip';

const classNames = {
  'One Way': 'long-arrow-alt-right',
  'Round Trip': 'exchange-alt',
};

const TripRouteCategory = ({ value }) => (
  <div data-tip={value} className='TripRouteCategory'>
    <i className={`fas fa-${classNames[value]}`} />
    <ReactTooltip effect='solid'/>
  </div>
);

export default TripRouteCategory;
