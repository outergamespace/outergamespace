import React from 'react';
import PropTypes from 'prop-types';
import SocketClientInterface from '../../../../socket/socketClientInterface';

const propTypes = {
  joinGame: PropTypes.func.isRequired,
  socketClientInterface: PropTypes.instanceOf(SocketClientInterface).isRequired,
};

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomId: '',
      errMsg: null,
    };

    /* SOCKET CLIENT INTERFACE */
    // this.socketClientInterface = new SocketClientInterface();

    /* METHOD BINDING */
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRoomId = this.onChangeRoomId.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  onChangeRoomId(event) {
    this.setState({
      roomId: event.target.value.toUpperCase(),
    });
  }

  joinGame() {
    const { roomId, username } = this.state;
    this.props.socketClientInterface.connection.emit('joinRoom', roomId, username, (errMsg, timePerQuestion) => {
      if (errMsg) {
        this.setState({ errMsg });
      } else {
        // joined game successfully
        this.props.joinGame(timePerQuestion);
      }
    });
  }

  render() {
    const { roomId, username, errMsg } = this.state;
    return (
      <div className="screen">
        <div className="screen-top" />

        <div className="screen-middle">
          <input
            type="text"
            placeholder="4-Digit Room Code"
            value={roomId}
            onChange={this.onChangeRoomId}
          />

          <input
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={this.onChangeUsername}
          />

          <button onClick={this.joinGame} >Join</button>
        </div>

        <div className="screen-bottom err-msg">{errMsg}</div>
      </div>
    );
  }
}

Join.propTypes = propTypes;

export default Join;
