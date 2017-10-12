import React from 'react';

class GameList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <button className="btn btn-light ml-1 mr-3" onClick={this.props.createGame}>Create Game</button>
          <button className="btn btn-light mr-3">Join Game</button>
          <button className="btn btn-light">User Page</button>
        </form>
      </div>
    );
  }
}

export default GameList;
