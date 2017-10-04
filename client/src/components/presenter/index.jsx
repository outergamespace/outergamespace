import React from 'react';
import ReactDOM from 'react-dom';
import PreGame from './PreGame.jsx';
import io from '../../../../socket/socketClientInterface.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };

    /* METHOD BINDING */
    this.updatePlayers = this.updatePlayers.bind(this);

    /* SOCKET EVENT LISTENERS */
    io.on('updatePlayers', this.updatePlayers);
  }

  updatePlayers(players) {
    this.setState({ players });
  }

  render() {
    return (
      <div>
        <PreGame players={this.state.players} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
