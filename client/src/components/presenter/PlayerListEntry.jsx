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

const PlayerListEntry = ({ player }) => (
  <div className="player-list-entry row">
    <div className="player-list-entry-name">{player.username}</div>
  </div>
);

PlayerListEntry.propTypes = propTypes;

export default PlayerListEntry;
