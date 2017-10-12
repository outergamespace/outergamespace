import React from 'react';
import PropTypes from 'prop-types';
import GameListItem from './GameListItem';

const propTypes = {
  createGame: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired
};

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
      <GameListItem key={game.room_id} game={game} joinGame={this.props.joinGame} />
    );

    return (
      <div>
        <ul>{gameListItems}</ul>
        <div>
          <button className="btn btn-light ml-1 mr-3" onClick={this.props.createGame}>Create Game</button>
        </div>
      </div>
    );
  }
}

GameList.propTypes = propTypes;

export default GameList;
