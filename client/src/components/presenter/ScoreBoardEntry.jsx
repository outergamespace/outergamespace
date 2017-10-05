import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  player: PropTypes.shape({
    socketId: PropTypes.string,
    username: PropTypes.string,
    score: PropTypes.number,
  })
    .isRequired,
};

const ScoreBoardEntry = ({ player }) => (
  <tbody>
    <tr className="score-board-entry">
      <td className="score-board-entry-name">{player.username}</td>
      <td className="score-board-entry-score">{player.score}</td>
    </tr>
  </tbody>
);

ScoreBoardEntry.propTypes = propTypes;

export default ScoreBoardEntry;
