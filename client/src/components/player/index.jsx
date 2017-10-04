import React from 'react';
import ReactDOM from 'react-dom';
import Join from './Join.jsx';
import Wait from './Wait.jsx';
import Question from '../common/Question.jsx';
import Finish from './Finish.jsx';

const io = require('socket.io-client');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: 'Question' };
    this.changePlayerStatus = this.changePlayerStatus.bind(this);
    this.createSocketConnection = this.createSocketConnection.bind(this);
  }
  // possible states = Join, Wait, Question, Finish;
  changePlayerStatus(state) {
    this.setState({ screen: state });
  }


  createSocketConnection() {
    // make the connection
    const connection = io.connect('http://10.6.70.110:3000');
    // start the game
    connection.emit('startGame');
    connection.on('status', data => {
      console.log('*** DATA: ', data.connection);
    });
    // simulate a game being joined
    connection.emit('joinGame', { username: 'Lam' });
    // this.setState({ socketConnection: this.createSocketConnection() });
  }

  render() {
    if (this.state.screen === 'Join') {
      return <Join />;
    } else if (this.state.screen === 'Wait') {
      return <Wait />;
    } else if (this.state.screen === 'Question') {
      return (
        <Question
          presenterFlag={this.props.presenterFlag}
          player={this.props.player}
          question={this.props.question}
          answers={this.props.answers} />
      );
    } else if (this.state.screen === 'Finish') {
      return <Finish/>;
    }
    // if input is not one of the expected strings
    return (
      'Error: unknown screen state, expected \
      Join, Wait, Question, Finish, but received: ' + this.state.screen
    );
  }
}

const testQuestion = 'This is a test Question';
const testAnswers = [
  'Here is a test answer',
  'Here is second test answer',
  'Here is third test answer',
  'Here is fourth test answer',
];
const testPlayer = {
  username: 'playername',
  score: 7,
};
// toggle radio button display on answer list
const testPresenterFlag = false;

ReactDOM.render(<App presenterFlag={testPresenterFlag} player={testPlayer} answers={testAnswers} question={testQuestion} />, document.getElementById('app'));
