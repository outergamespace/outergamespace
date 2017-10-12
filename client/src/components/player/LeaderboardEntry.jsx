import React from 'react';

const LeaderboardEntry = props => (
  <li>{props.user.name}
    <ul>
      <li>Total Points:{props.user.total_points}</li>
      <li>Games Played:{props.user.games_played}</li>
    </ul>
  </li>
);

export default LeaderboardEntry;
