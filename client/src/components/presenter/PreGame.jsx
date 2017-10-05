import React from 'react';
import PropTypes from 'prop-types';
import PlayerList from './PlayerList.jsx';
import io from '../../../../socket/socketClientInterface.js';

const startGame = () => {
  io.emit('startGame');
};

const propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// render venue screen with list of joined players and a start button
const PreGame = ({ players }) => (
  <div>
    <div>Waiting for Players to Join</div>
    <PlayerList players={players} />
    <button onClick={startGame} >Start</button>
  </div>
);

PreGame.propTypes = propTypes;

export default PreGame;
