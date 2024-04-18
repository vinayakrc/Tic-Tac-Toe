import React from 'react';

const Scoreboard = ({ scores }) => (
  <div className="scoreboard">
    <div>Scoreboard</div>
    <div>X: {scores.X}</div>
    <div>O: {scores.O}</div>
  </div>
);

export default Scoreboard;
