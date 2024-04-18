import React from 'react';

const Square = ({ value, onClick, highlight, winLine }) => (
  <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onClick}>
    {value}
    {winLine && <div className="win-line" />}
  </button>
);

export default Square;
