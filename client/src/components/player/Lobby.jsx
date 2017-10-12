import React from 'react';
import PropTypes from 'prop-types';
import GameList from './GameList';

const propTypes = {
  username: PropTypes.string.isRequired,
  createGame: PropTypes.func.isRequired
};

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      chatPanelRender: 'hidden',
      gamePanelRender: 'hidden',
      leaderboardRender: 'hidden',
      chatInput: ''
    };

    this.chatHandler = this.chatHandler.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        chatPanelRender: 'animated slideInUp',
        gamePanelRender: 'animated slideInRight',
        leaderboardRender: 'animated slideInLeft'
      });
    }, 600);
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

  createGame(event) {
    event.preventDefault();
    this.props.createGame();
  }

  render() {
    return (
      <div className="container-fluid main-lobby">
        <img
          id="lobby-background"
          src="../..//mars-surface.jpg"
          alt="mars-surface"
          className="animated zoomIn"
        />
        <div className="container-fluid">
          <div className="row justify-content-sm-center">
            <div className={`col-sm-3 leaderboard mr-3 ${this.state.leaderboardRender}`} />
            <div className={`col-sm-5 chat-window mr-3 ${this.state.chatPanelRender}`}>
              <div className="input-group chatInput">
                <span className="input-group-addon" id="basic-addon3">{this.state.username}</span>
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
              <GameList createGame={this.createGame} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lobby.propTypes = propTypes;

export default Lobby;
