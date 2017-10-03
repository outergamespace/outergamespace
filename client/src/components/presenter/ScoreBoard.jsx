import React from 'react';

import ScoreBoardEntry from './ScoreBoardEntry.jsx';

const ScoreBoard = props => (
  <div className="score-board">
    <h3 className="score-board-title">Final Results</h3>
    <table>
      {props.players.map(player => (<ScoreBoardEntry player={player} />))}
    </table>
  </div>
);

export default ScoreBoard;
