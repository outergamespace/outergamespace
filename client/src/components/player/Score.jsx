import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  final: PropTypes.bool,
  leaveGame: PropTypes.func,
};

const defaultProps = {
  final: false,
  leaveGame: () => {},
};

const Score = ({ final, leaveGame }) => (
  <div className="center">
    <p>Check your score on the main screen!</p>
    {final ? <button onClick={leaveGame} >Play Again</button> : ''}
  </div>
);

Score.propTypes = propTypes;
Score.defaultProps = defaultProps;

export default Score;
