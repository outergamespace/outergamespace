import React from 'react';

class Lobby extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.username,
      chatPanelRender: 'hidden',
      gamePanelRender: 'hidden',
      leaderboardRender: 'hidden',
      chatInput: ''
    }

    this.chatHandler = this.chatHandler.bind(this);
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

  chatHandler(event) {
    const name = event.target.name;
    const input = event.target.value;
    this.setState({
      [name]: input
    });
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

  render() {
    return (
      <div className="container-fluid main-lobby">
        <img id="lobby-background" src="../..//mars-surface.jpg" alt="mars-surface" className="animated zoomIn"/>
        <div className="container-fluid">
          <div className="row justify-content-sm-center">
            <div className={`col-sm-3 leaderboard mr-3 ${this.state.leaderboardRender}`}>
            </div>
            <div className={`col-sm-5 chat-window mr-3 ${this.state.chatPanelRender}`}>
              <div className="input-group chatInput">
                <span className="input-group-addon" id="basic-addon3">{this.state.username}</span>
                <input type="text" 
                  className="form-control" 
                  name="chatInput" 
                  placeholder="chat here!"
                  onKeyDown={this.checkSubmit}
                  onChange={this.chatHandler}
                  value={this.state.chatInput}
                  aria-describedby="basic-addon3">
                </input>
              </div>
            </div>
            <div className={`col-sm-3 game-list ${this.state.gamePanelRender}`}>
              <form>
                <button className="btn btn-light ml-1 mr-3">Create Game</button>
                <button className="btn btn-light mr-3">Join  Game</button>
                <button className="btn btn-light">User Page</button>       
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Lobby;