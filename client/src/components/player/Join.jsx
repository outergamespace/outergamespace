import React from 'react';
import PropTypes from 'prop-types';
import io from '../../../../socket/socketClientInterface.js';

const propTypes = {
  setWaitScreen: PropTypes.func.isRequired,
};

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomId: '',
      errMsg: null,
    };

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
    io.emit('joinRoom', roomId, username, (errMsg) => {
      if (errMsg) {
        this.setState({ errMsg });
      } else {
        // joined game successfully
        this.props.setWaitScreen();
      }
    });
  }

  render() {
    const { roomId, username, errMsg } = this.state;
    return (
      <div>
        <div className="center">
          Room Code
          <input className="join" type="text" value={roomId} onChange={this.onChangeRoomId} />

          Choose a name
          <input className="join" type="text" value={username} onChange={this.onChangeUsername} />
        </div>
        <div>
          {errMsg ? <div className="center" >{errMsg}</div> : '' }
          <button onClick={this.joinGame} >Join</button>
        </div>
      </div>
    );
  }
}

Join.propTypes = propTypes;

export default Join;
