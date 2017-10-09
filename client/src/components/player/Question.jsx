import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';
import Timer from './Timer';
import io from '../../../../socket/socketClientInterface';

const TIME_FOR_QS = 5;

const propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    io.emit('submitAnswer', this.state.currentAns, () => {
      this.props.setScreen('answered');
    });
  }

  render() {
    const { question, answers } = this.props;
    const { currentAns } = this.state;
    return (
      <div className="screen">
        <div className="screen-top question">{question}</div>

        <AnswerList answers={answers} currentAns={currentAns} updateAnswer={this.updateAnswer} />

        <div className="screen-bottom">
          <button disabled={currentAns === ''} onClick={this.sendAnswer} >
            Submit (<Timer seconds={TIME_FOR_QS} />)
          </button>
        </div>
      </div>
    );
  }
}

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
