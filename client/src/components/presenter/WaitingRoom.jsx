import React from 'react';
import PropTypes from 'prop-types';
import PlayerList from './PlayerList';
import io from '../../../../socket/socketClientInterface';

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

    /* METHOD BINDING */
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    io.emit('startGame', (errMsg) => {
      this.setState({ errMsg });
    });
  }

  render() {
    const { roomId, players } = this.props;
    const { errMsg } = this.state;
    return (
      <div>
        <div className="center" >Room Code: {roomId}</div>
        <div className="center" >Waiting for Players to Join</div>
        <PlayerList players={players} />
        {errMsg ? <div className="center" >{errMsg}</div> : ''}
        <button onClick={this.startGame} >Start</button>
      </div>
    );
  }
}

WaitingRoom.propTypes = propTypes;

export default WaitingRoom;
