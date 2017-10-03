import React from 'react';
import ReactDOM from 'react-dom';
import Join from './Join.jsx';
import Wait from './Wait.jsx';
import Question from './Question.jsx';
import Finish from './Finish.jsx';

// TODO import component files

const App = (props) => (
  <div>
    <h3>INSERT PLAYER CLIENT COMPONENT HERE</h3>
    <Join/>
    <Wait/>
    <Question presenterFlag={props.presenterFlag} player={props.player} question={props.question} answers={props.answers} />
    <Finish/>
  </div>
);
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
const testPresenterFlag = false;

ReactDOM.render(<App presenterFlag={testPresenterFlag} player={testPlayer} answers={testAnswers} question={testQuestion} />, document.getElementById('app'));
