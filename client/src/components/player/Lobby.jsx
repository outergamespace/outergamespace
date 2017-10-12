import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import GameList from './GameList';
import Leaderboard from './Leaderboard';
import SocketClientInterface from '../../../../socket/socketClientInterface';

const propTypes = {
  username: PropTypes.string.isRequired,
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  socketClientInterface: PropTypes.instanceOf(SocketClientInterface).isRequired
};

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatPanelRender: 'hidden',
      gamePanelRender: 'hidden',
      leaderboardRender: 'hidden',
      chatInput: '',
      users: []
    };

    this.chatHandler = this.chatHandler.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        chatPanelRender: 'animated slideInUp',
        gamePanelRender: 'animated slideInRight',
        leaderboardRender: 'animated slideInLeft'
      });
    }, 600);
    this.getAllUsers();
  }

  chatHandler(event) {
    const name = event.target.name;
    const input = event.target.value;
    this.setState({
      [name]: input
    });
  }

  checkSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      // TODO grab chat and write to db
      this.setState({
        chatInput: ''
      });
    }
  }

  joinGame(roomId) {
    this.props.socketClientInterface.connection.emit('joinRoom', roomId, this.props.username, (errMsg, timePerQuestion) => {
      if (errMsg) {
        console.error(errMsg);
      } else {
        // joined game successfully
        this.props.joinGame(timePerQuestion);
      }
    });
  }

  getAllUsers() {
    axios.get('/users')
      .then((response) => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container-fluid main-lobby">
<<<<<<< HEAD
        <img
          id="lobby-background"
          src="../..//mars-surface.jpg"
          alt="mars-surface"
          className="animated zoomIn"
        />
=======
        <img id="lobby-background" src="../../mars-surface.jpg" alt="mars-surface" className="animated zoomIn"/>
>>>>>>> Refactor game screen with bootstrap and animations
        <div className="container-fluid">
          <div className="row justify-content-sm-center">
            <Leaderboard
              users={this.state.users}
              leaderboardRender={this.state.leaderboardRender}
            />
            <div className={`col-sm-5 chat-window mr-3 ${this.state.chatPanelRender}`}>
              <div className="input-group chatInput">
                <span className="input-group-addon" id="basic-addon3">{this.props.username}</span>
                <input
                  type="text"
                  className="form-control"
                  name="chatInput"
                  placeholder="chat here!"
                  onKeyDown={this.checkSubmit}
                  onChange={this.chatHandler}
                  value={this.state.chatInput}
                  aria-describedby="basic-addon3"
                />
              </div>
            </div>
            <div className={`col-sm-3 game-list ${this.state.gamePanelRender}`}>
              <GameList
                createGame={this.props.createGame}
                joinGame={this.joinGame}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lobby.propTypes = propTypes;

export default Lobby;
