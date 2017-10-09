import React from 'react';
import PropTypes from 'prop-types';
import AnsweredPlayerListEntry from './AnsweredPlayerListEntry';

const propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const AnsweredPlayerList = ({ players }) => (
  <div className="answered-player-list">
    {players.map(player => <AnsweredPlayerListEntry key={player.username} player={player} />)}
  </div>
);

AnsweredPlayerList.propTypes = propTypes;

export default AnsweredPlayerList;
