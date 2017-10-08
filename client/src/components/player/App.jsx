import React from 'react';
import Join from './Join.jsx';
import Wait from './Wait.jsx';
import Question from './Question.jsx';
import Score from './Score.jsx';
import io from '../../../../socket/socketClientInterface.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: 'join',
      question: '',
      answers: [],
    };

    /* METHOD BINDING */
    this.setScreen = this.setScreen.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.hostDisconnectHandler = this.hostDisconnectHandler.bind(this);
  }

  componentDidMount() {
    /* SOCKET EVENT LISTENERS */
    io.on('nextQuestion', this.nextQuestion);
    io.on('showAnswer', () => this.setScreen('roundScores'));
    io.on('showRoundScores', () => this.setScreen('roundScores'));
    io.on('showFinalScores', () => this.setScreen('finalScores'));
    io.on('hostDisconnect', this.hostDisconnectHandler);
  }

  componentWillUnmount() {
    /* SOCKET EVENT LISTENERS */
    io.removeAllListeners('nextQuestion');
    io.removeAllListeners('showAnswer');
    io.removeAllListeners('showRoundScores');
    io.removeAllListeners('showFinalScores');
  }

  setScreen(screen) {
    this.setState({ screen });
  }

  nextQuestion(question) {
    this.setState({
      screen: 'question',
      question: question.prompt,
      answers: question.answers,
    });
  }

  leaveGame() {
    io.emit('leaveGame', () => {
      this.setScreen('join');
    });
  }

  hostDisconnectHandler() {
    this.setScreen('hostDisconnect');
  }

  render() {
    const { screen, question, answers } = this.state;
    if (screen === 'join') {
      return <Join setWaitScreen={() => this.setScreen('wait')} />;
    } else if (screen === 'wait') {
      return <Wait />;
    } else if (screen === 'question') {
      return <Question question={question} answers={answers} setScreen={this.setScreen} />;
    } else if (screen === 'answered') {
      return <div className="center">You have submitted your answer</div>;
    } else if (screen === 'finalScores') {
      return <Score final leaveGame={this.leaveGame} />;
    } else if (screen === 'roundScores') {
      return <Score />;
    } else if (screen === 'hostDisconnect') {
      return <div>The game ended unexpectedly because we lost connection with the host</div>;
    }

    // if input is not one of the expected strings
    return <div>Error: unknown screen state: {screen}</div>;
  }
}

export default App;
