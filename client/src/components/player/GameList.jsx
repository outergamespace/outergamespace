import React from 'react';
import GameListItem from './GameListItem';

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    fetch('/games')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          games: data
        });
      })
      .catch(console.error);
  }

  render() {
    const gameListItems = this.state.games.map(game =>
      <GameListItem game={game} />
    );

    return (
      <div>
        <ul>{gameListItems}</ul>
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
