import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList.jsx';
import Timer from '../common/Timer.jsx';
import io from '../../../../socket/socketClientInterface.js';

const propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  username: PropTypes.string,
  setScreen: PropTypes.func,
};

const defaultProps = {
  username: '',
  setScreen: () => {},
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAns: '',
    };

    /* METHOD BINDING */
    this.updateAnswer = this.updateAnswer.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
  }

  updateAnswer(answer) {
    this.setState({
      currentAns: answer,
    });
  }

  sendAnswer() {
    this.props.setScreen('answered');
    io.emit('submitAnswer', this.props.username, this.state.currentAns);
  }

  render() {
    const { question, answers } = this.props;
    const { currentAns } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div>{question}</div>
          <Timer />
        </div>
        <div className="row">
          <AnswerList answers={answers} currentAns={currentAns} updateAnswer={this.updateAnswer} />
          {currentAns === '' ? '' : <button onClick={this.sendAnswer} >Submit</button>}
        </div>
      </div>
    );
  }
}

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
