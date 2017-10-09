import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  final: PropTypes.bool,
  restartGame: PropTypes.func,
};

const defaultProps = {
  final: false,
  restartGame: () => {},
};

const Scoreboard = ({ players, final, restartGame }) => {
  const sortedPlayers = _.sortBy(players, 'score').reverse();
  return (
    <div className="screen">
      <div className="screen-top" >{final && 'Final'} Scoreboard</div>

      <div className="screen-middle screen-bordered" >
        <div className="table-body">
          <div className="table-col">
            {sortedPlayers.map(player => (
              <div key={player.username} className="table-row" >{player.username}</div>
            ))}
          </div>

          <div className="table-col">
            {sortedPlayers.map(player => (
              <div key={player.username} className="table-row" >{player.score}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="screen-bottom">
        {final && <button onClick={restartGame} >New Game</button>}
      </div>
    </div>
  );
};

Scoreboard.propTypes = propTypes;
Scoreboard.defaultProps = defaultProps;

export default Scoreboard;
