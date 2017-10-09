import React from 'react';
import PropTypes from 'prop-types';
// import io from '../../../../socket/socketClientInterface';
const SocketClientInterface = require('../../../../socket/socketClientInterface.js');

const propTypes = {
  roomId: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: null,
    };

    /* SOCKET CLIENT INTERFACE */
    this.socketClientInterface = new SocketClientInterface();

    /* METHOD BINDING */
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    // io.emit('startGame', (errMsg) => {
    //   this.setState({ errMsg });
    // });
    this.socketClientInterface.connection.emit('startGame', (errMsg) => {
      this.setState({ errMsg });
    });
  }

  render() {
    const { roomId, players } = this.props;
    return (
      <div className="screen">
        <div className="screen-top" >Room Code: {roomId}</div>

        <div className="screen-middle screen-bordered" >
          {
            players.length === 0
              ? 'Waiting for players to join...'
              : players.map(player => <div key={player.username} >{player.username}</div>)
          }
        </div>

        <div className="screen-bottom">
          <button disabled={players.length === 0} onClick={this.startGame} >Start Game</button>
        </div>
      </div>
    );
  }
}

WaitingRoom.propTypes = propTypes;

export default WaitingRoom;
