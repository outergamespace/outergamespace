import React from 'react';

const PlayerList = (props) => (
  <div className="player-list">
    {props.players.map((player, k) => {
      <PlayerListEntry player={player} key={k} />
    });}
  </div>
);
