import React from 'react';

const ScoreBoardEntry = props => (
  <tr>
    <div className="score-board-entry">
      <td>
        <div className="score-board-entry-name">{props.player.username}</div>
      </td>
      <td>
        <div className="score-board-entry-score">{props.player.score}</div>
      </td>
    </div>
  </tr>
);

export default ScoreBoardEntry;
