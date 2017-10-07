import React from 'react';
import PropTypes from 'prop-types';
import PlayerListEntry from './PlayerListEntry.jsx';

const propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const PlayerList = ({ players }) => (
  <div className="player-list">
    {players.map(player => <PlayerListEntry key={player.username} player={player} />)}
  </div>
);

PlayerList.propTypes = propTypes;

export default PlayerList;
