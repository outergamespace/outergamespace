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
      username: '',
      screen: 'join',
      question: '',
      answers: [],
    };

    /* METHOD BINDING */
    this.setScreen = this.setScreen.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

    /* SOCKET EVENT LISTENERS */
    io.on('nextQuestion', this.nextQuestion);
    io.on('showRoundScores', () => this.setScreen('roundScores'));
    io.on('showFinalScores', () => this.setScreen('finalScores'));
  }

  // possible states: 'join', 'wait', 'question', 'answered', 'roundScores', 'finalScores';
  setScreen(screen) {
    this.setState({ screen });
  }

  setUsername(username) {
    this.setState({ username });
  }

  nextQuestion(question) {
    this.setState({
      screen: 'question',
      question: question.prompt,
      answers: question.answers,
    });
  }

  render() {
    const { username, screen, question, answers } = this.state;
    if (screen === 'join') {
      return (
        <Join
          setWaitScreen={() => this.setScreen('wait')}
          setUsername={this.setUsername}
        />
      );
    } else if (screen === 'wait') {
      return <Wait />;
    } else if (screen === 'question') {
      return (
        <Question
          question={question}
          answers={answers}
          username={username}
          setScreen={this.setScreen}
        />
      );
    } else if (screen === 'answered') {
      return <div>You have submitted your answer</div>;
    } else if (screen === 'finalScores') {
      return <Score final newGame={() => this.setScreen('join')} />;
    } else if (screen === 'roundScores') {
      return <Score />;
    }

    // if input is not one of the expected strings
    return <div>Error: unknown screen state: {screen}</div>;
  }
}

export default App;
