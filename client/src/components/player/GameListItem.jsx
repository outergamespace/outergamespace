import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  game: PropTypes.shape({
    room_id: PropTypes.string,
    host_username: PropTypes.string,
    num_questions: PropTypes.number,
    time_per_question: PropTypes.number,
    max_players: PropTypes.number,
    num_players: PropTypes.number,
    is_started: PropTypes.number
  }).isRequired,
  joinGame: PropTypes.func.isRequired
};

const GameListItem = (props) => {
  const handleClick = () => {
    props.joinGame(props.game.room_id);
  }

  return (
    <div onClick={handleClick}>
      <p>Room Code: {props.game.room_id}</p>
      <p>Hosted By: {props.game.host_username}</p>
      <p># Questions: {props.game.num_questions}</p>
      <p>Max Players: {props.game.max_players}</p>
      <p># Players: {props.game.num_players}</p>
    </div>
  );
};

GameListItem.propTypes = propTypes;

export default GameListItem;
