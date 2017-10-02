import React from 'react';

import PlayerListEntry from './PlayerListEntry.jsx';

const PlayerList = (props) => (
  <div className="player-list">
    {props.players.map((player, k) => <PlayerListEntry player={player} key={k} /> )}
  </div>
);

export default PlayerList;
