import React from 'react';
import ReactDOM from 'react-dom';
import PreGame from './PreGame.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import Question from '../common/Question.jsx';
import io from '../../../../socket/socketClientInterface.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'wait',
      players: [],
      question: '',
      answers: [],
    };

    /* METHOD BINDING */
    this.setScreen = this.setScreen.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showRoundScores = this.showRoundScores.bind(this);
    this.showFinalScores = this.showFinalScores.bind(this);
    this.restartGame = this.restartGame.bind(this);

    /* SOCKET EVENT LISTENERS */
    io.on('updatePlayers', this.updatePlayers);
    io.on('nextQuestion', this.nextQuestion);
    io.on('showRoundScores', this.showRoundScores);
    io.on('showFinalScores', this.showFinalScores);
  }

  // screen can be one of: 'wait', 'question', 'roundScores', 'finalScores'
  setScreen(screen) {
    this.setState({ screen });
  }

  updatePlayers(players) {
    this.setState({ players });
  }

  nextQuestion(question) {
    this.setState({
      screen: 'question',
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
    this.setScreen('finalScores');
  }

  restartGame() {
    this.setState({
      screen: 'wait',
      players: [],
      question: '',
      answers: [],
    });
    io.emit('restartGame');
  }

  render() {
    const { screen, players, question, answers } = this.state;
    if (screen === 'wait') {
      return <PreGame players={players} />;
    } else if (screen === 'question') {
      return (
        <Question
          presenterFlag
          question={question}
          answers={answers}
        />
      );
    } else if (screen === 'roundScores') {
      return <ScoreBoard players={players} />;
    } else if (screen === 'finalScores') {
      return <ScoreBoard players={players} final restartGame={this.restartGame} />;
    }

    // if input is not one of the expected strings
    return <div>Error: unknown screen state: {screen}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
