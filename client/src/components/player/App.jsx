import React from 'react';
import Join from './Join';
import Question from './Question';
import TextScreen from './TextScreen';
import FrontPage from './FrontPage';
import Lobby from './Lobby';
import SocketClientInterface from '../../../../socket/socketClientInterface';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: 'front',
      timePerQuestion: 0,
      question: '',
      answers: [],
      username: '',
      password: ''
    };

    /* SOCKET CLIENT INTERFACE */
    this.socketClientInterface = new SocketClientInterface();

    /* METHOD BINDING */
    this.handleLogin = this.handleLogin.bind(this);
    this.setScreen = this.setScreen.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.showRoundScores = this.showRoundScores.bind(this);
    this.showFinalScores = this.showFinalScores.bind(this);
    this.hostDisconnectHandler = this.hostDisconnectHandler.bind(this);
  }

  componentDidMount() {
    /* SOCKET EVENT LISTENERS */
    this.socketClientInterface.listenForPlayerEvents();
    // register the callback handlers
    this.socketClientInterface.registerCallbackPlayerNextQuestion(this.nextQuestion);
    this.socketClientInterface.registerCallbackPlayerShowAnswer(this.showAnswer);
    this.socketClientInterface.registerCallbackPlayerShowRoundScores(this.showRoundScores);
    this.socketClientInterface.registerCallbackPlayerShowFinalScores(this.showFinalScores);
    this.socketClientInterface.registerCallbackPlayerHostDisconnect(this.hostDisconnectHandler);
  }

  componentWillUnmount() {
    /* SOCKET EVENT LISTENERS */
    this.socketClientInterface.removeListenersForPlayerEvents();
  }

  handleLogin(username, password) {
    console.log('Logging in...', username);
    this.setState({
      username: username,
      password: password,
      // Authentication routing should occur here, instantly routing to lobby is for testing only
      screen: 'lobby'
    });
  }

  setScreen(screen) {
    this.setState({ screen });
  }

  joinGame(timePerQuestion) {
    this.setState({ timePerQuestion });
    this.setScreen('wait');
  }

  showAnswer() {
    this.setScreen('roundScores');
  }

  showRoundScores() {
    this.setScreen('roundScores');
  }

  showFinalScores() {
    this.setScreen('finalScores');
  }

  nextQuestion(question) {
    this.setState({
      screen: 'question',
      question: question.prompt,
      answers: question.answers,
    });
  }

  leaveGame() {
    // io.emit('leaveGame', () => {
    //   this.setScreen('join');
    // });
    this.socketClientInterface.connection.emit('leaveGame', () => {
      this.setScreen('front');
    });
  }

  hostDisconnectHandler() {
    this.setScreen('hostDisconnect');
  }

  render() {
    const { screen, timePerQuestion, question, answers } = this.state;
    const waitText = 'Please wait for the game to begin';
    const answeredText = 'You have submitted your answer';
    const scoreText = 'Check out the main screen!';
    const hostDisconnectText = 'The game ended unexpectedly because we lost connection with the host :-(';

    if (screen === 'front') {
      return <FrontPage handleLogin={this.handleLogin}/>;
    } else if (screen === 'lobby') {
      return <Lobby username={this.state.username}/>
    } if (screen === 'join') {
      return <Join joinGame={this.joinGame} socketClientInterface={this.socketClientInterface} />;
    } else if (screen === 'wait') {
      return <TextScreen text={waitText} />;
    } else if (screen === 'question') {
      return (
        <Question
          question={question}
          answers={answers}
          setScreen={this.setScreen}
          time={timePerQuestion}
          socketClientInterface={this.socketClientInterface}
        />
      );
    } else if (screen === 'answered') {
      return <TextScreen text={answeredText} />;
    } else if (screen === 'roundScores') {
      return <TextScreen text={scoreText} />;
    } else if (screen === 'finalScores') {
      return <TextScreen text={scoreText} btnText={'Play Again'} btnOnClick={this.leaveGame} />;
    } else if (screen === 'hostDisconnect') {
      return <TextScreen text={hostDisconnectText} />;
    }
    return <div />;
  }
}

export default App;
