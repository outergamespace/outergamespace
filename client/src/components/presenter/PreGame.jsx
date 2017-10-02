import React from 'react';
import PlayerList from '../common/PlayerList.jsx';
// import /*component name*/ from './childname.jsx'; if needed

// render venue screen with list of joined players and a start button

class PreGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPlay: true,
    };
    this.startNewGame = this.startNewGame.bind(this);
  }
  startNewGame() {
    console.log('clicked');
    this.setState({
      // TODO start game code
    });
  }
  render() {
    return (
      <div>
        <div>Waiting for Players to Join</div>
        <PlayerList players={this.props.players} />
        <button onClick={this.startNewGame}>Start</button>
      </div>
    );
  }
}

export default PreGame;
