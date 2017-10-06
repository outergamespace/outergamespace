import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  final: PropTypes.bool,
  newGame: PropTypes.func,
};

const defaultProps = {
  final: false,
  newGame: () => {},
};

const Score = ({ final, newGame }) => (
  <div className="center">
    <p>Check your score on the main screen!</p>
    {final ? <button onClick={newGame} >Play Again</button> : ''}
  </div>
);

Score.propTypes = propTypes;
Score.defaultProps = defaultProps;

export default Score;
