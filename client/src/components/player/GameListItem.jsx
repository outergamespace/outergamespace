import React from 'react';

class GameListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Room Code: {this.props.game.room_id}</p>
        <p>Hosted By: {this.props.game.host_username}</p>
        <p># Questions: {this.props.game.num_questions}</p>
        <p>Max Players: {this.props.game.max_players}</p>
        <p># Players: {this.props.game.num_players}</p>
      </div>
    );
  }
}

export default GameListItem;
