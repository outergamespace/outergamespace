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
  <div>
    Check your score on the main screen!
    {final ? <button onClick={newGame} >Join New Game</button> : ''}
  </div>
);

Score.propTypes = propTypes;
Score.defaultProps = defaultProps;

export default Score;
