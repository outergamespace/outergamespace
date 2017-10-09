import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ScoreboardEntry from './ScoreboardEntry';

const propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  final: PropTypes.bool,
  restartGame: PropTypes.func,
};

const defaultProps = {
  final: false,
  restartGame: () => {},
};

const Scoreboard = ({ players, final, restartGame }) => (
  <div className="score-board">
    <h3 className="score-board-title">
      {final ? 'Final' : ''} Results
    </h3>
    <table>
      {_.sortBy(players, 'score')
        .reverse()
        .map(player => (<ScoreboardEntry key={player.username} player={player} />))}
    </table>
    {final ? <button onClick={restartGame} >Start New Game</button> : ''}
  </div>
);

Scoreboard.propTypes = propTypes;
Scoreboard.defaultProps = defaultProps;

export default Scoreboard;
