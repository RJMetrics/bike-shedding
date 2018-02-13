import React from 'react';
import './Popover.css';
import { Hint } from 'react-vis';

const Popover = ({ value }) => (
  <Hint value={value}>
    <div className='Popover'>
      <h3>Value of hint</h3>
      <p>{value.x}</p>
    </div>
  </Hint>
);

export default Popover;
