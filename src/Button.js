import React from 'react';
import './Button.css';

const Button = ({ selected, onClick, children }) => (
  <button
    className={selected ? 'selected' : null}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
