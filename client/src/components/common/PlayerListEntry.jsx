import React from 'react';

const PlayerListEntry = (props) => {
  return (
    <div className="player-list-entry row">
      <div className="player-list-entry-avatar">{props.player.avatar}</div>
      <div className="player-list-entry-name">{props.player.name}</div>
      <div className="player-list-entry-score">{props.player.score}</div>
    </div>
  );
};

export default PlayerListEntry;
