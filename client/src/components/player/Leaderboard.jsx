import React from 'react';
import LeaderboardEntry from './LeaderboardEntry';

const Leaderboard = props => (
  <div className={`col-sm-3 leaderboard mr-3 ${props.leaderboardRender}`}>
    <ol>
      {props.users.sort((a, b) => b.total_points - a.total_points)
        .map(user => <LeaderboardEntry key={user.id} user={user} />)}
    </ol>
  </div>
);

export default Leaderboard;
