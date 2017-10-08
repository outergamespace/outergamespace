import React from 'react';
import CreateRoom from './CreateRoom';
import PreGame from './PreGame';
import ScoreBoard from './ScoreBoard';
import Question from './Question';
import io from '../../../../socket/socketClientInterface';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'create',
      roomId: '',
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

  createRoom() {
    io.emit('createRoom', (err, roomId) => {
      this.setState({ roomId });
      this.setScreen('wait');
    });
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
    this.setState({
      screen: 'create',
      roomId: '',
      players: [],
      question: '',
      answers: [],
      finalScores: [],
    });
    io.emit('endGame');
  }

  render() {
    const { screen, roomId, players, question, answers, finalScores } = this.state;

    if (screen === 'create') {
      return <CreateRoom createRoom={this.createRoom} />;
    } else if (screen === 'wait') {
      return <PreGame players={players} roomId={roomId} />;
    } else if (screen === 'question') {
      return <Question question={question} answers={answers} players={players} />;
    } else if (screen === 'roundScores') {
      return <ScoreBoard players={players} />;
    } else if (screen === 'finalScores') {
      return <ScoreBoard players={finalScores} final restartGame={this.restartGame} />;
    }

    // if input is not one of the expected strings
    return <div>Error: unknown screen state: {screen}</div>;
  }
}

export default App;
