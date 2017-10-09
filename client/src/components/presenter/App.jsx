import React from 'react';
import CreateRoom from './CreateRoom';
import WaitingRoom from './WaitingRoom';
import Scoreboard from './Scoreboard';
import Question from './Question';
import io from '../../../../socket/socketClientInterface';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'create',
      roomId: '',
      gameConfig: {},
      players: [],
      question: '',
      answers: [],
      finalScores: [],
    };

    /* METHOD BINDING */
    this.setScreen = this.setScreen.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showRoundScores = this.showRoundScores.bind(this);
    this.showFinalScores = this.showFinalScores.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  componentDidMount() {
    /* SOCKET EVENT LISTENERS */
    io.on('updatePlayers', this.updatePlayers);
    io.on('nextQuestion', this.nextQuestion);
    io.on('showRoundScores', this.showRoundScores);
    io.on('showFinalScores', this.showFinalScores);
  }

  componentWillUnmount() {
    /* SOCKET EVENT LISTENERS */
    io.removeAllListeners('updatePlayers');
    io.removeAllListeners('nextQuestion');
    io.removeAllListeners('showRoundScores');
    io.removeAllListeners('showFinalScores');
  }

  // screen can be one of: 'create', 'wait', 'question', 'roundScores', 'finalScores'
  setScreen(screen) {
    this.setState({ screen });
  }

  createRoom(roomId, gameConfig) {
    this.setState({ roomId, gameConfig });
    this.setScreen('wait');
  }

  updatePlayers(players) {
    this.setState({ players });
  }

  nextQuestion(question, players) {
    this.setState({
      screen: 'question',
      players,
      question: question.prompt,
      answers: question.answers,
    });
  }

  showRoundScores(players) {
    this.updatePlayers(players);
    this.setScreen('roundScores');
  }

  showFinalScores(players) {
    this.updatePlayers(players);
    this.setState(prevState => ({
      finalScores: prevState.players.slice(),
    }));
    this.setScreen('finalScores');
  }

  restartGame() {
    io.emit('endGame', () => {
      this.setState({
        screen: 'create',
        roomId: '',
        gameConfig: {},
        players: [],
        question: '',
        answers: [],
        finalScores: [],
      });
    });
  }

  render() {
    const { screen, roomId, gameConfig, players, question, answers, finalScores } = this.state;

    if (screen === 'create') {
      return <CreateRoom createRoom={this.createRoom} />;
    } else if (screen === 'wait') {
      return <WaitingRoom players={players} roomId={roomId} />;
    } else if (screen === 'question') {
      return (
        <Question
          question={question}
          answers={answers}
          players={players}
          time={gameConfig.timePerQuestion}
        />
      );
    } else if (screen === 'roundScores') {
      return <Scoreboard players={players} />;
    } else if (screen === 'finalScores') {
      return <Scoreboard players={finalScores} final restartGame={this.restartGame} />;
    }
    return <div />;
  }
}

export default App;
