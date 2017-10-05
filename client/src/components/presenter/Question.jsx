import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList.jsx';
import Timer from './Timer.jsx';
import io from '../../../../socket/socketClientInterface.js';
// timer component renders 20 second countdown after loading

const propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAns: '',
    };

    /* METHOD BINDING */
    this.setCorrectAns = this.setCorrectAns.bind(this);
  }

  componentDidMount() {
    /* SOCKET EVENT LISTENERS */
    io.on('showAnswer', this.setCorrectAns);
  }

  componentWillUnmount() {
    /* SOCKET EVENT LISTENERS */
    io.removeAllListeners('showAnswer');
  }

  setCorrectAns(correctAns) {
    this.setState({ correctAns });
  }

  render() {
    const { question, answers } = this.props;
    const { correctAns } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div >{question}</div>
        </div>
        <div className="row">
          <AnswerList answers={answers} correctAns={correctAns} />
        </div>
      </div>
    );
  }
}

Question.propTypes = propTypes;

export default Question;
