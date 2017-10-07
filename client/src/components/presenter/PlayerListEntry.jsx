import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  player: PropTypes.shape({
    username: PropTypes.string,
    score: PropTypes.number,
    answered: PropTypes.bool,
  })
    .isRequired,
};

const PlayerListEntry = ({ player: { username, answered } }) => {
  const answeredClass = answered ? 'player-answered' : '';
  const playerListEntryClass = `player-list-entry ${answeredClass}`;
  return (
    <div className="player-list-entry row">
      <div className={playerListEntryClass}>{username}</div>
    </div>
  );
};

PlayerListEntry.propTypes = propTypes;

export default PlayerListEntry;
