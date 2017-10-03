import React from 'react';

import ScoreBoard from './ScoreBoard.jsx';

const PresenterResults = props => (
  <div className="presenter-results">
    <ScoreBoard players={props.players} />
    <button>Start New Game</button>
  </div>
);

export default PresenterResults;
