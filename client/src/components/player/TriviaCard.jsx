import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';
import Timer from './Timer';
import SocketClientInterface from '../../../../socket/socketClientInterface';

const propTypes = {
  time: PropTypes.number.isRequired,
  screen: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  setScreen: PropTypes.func,
  socketClientInterface: PropTypes.instanceOf(SocketClientInterface).isRequired
};

const defaultProps = {
  username: '',
  setScreen: () => {}
};

class TriviaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnswer: '',
      visibility: props.visibility
    };

    this.updateAnswer = this.updateAnswer.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
  }

  updateAnswer(answer) {
    this.setState({
      currentAns: answer,
    });
  }

  sendAnswer() {
    this.props.socketClientInterface.connection.emit('submitAnswer', this.state.currentAns, () => {
      this.props.setScreen('answered');
    });
  }

  render() {
    const { question, answers, time } = this.props;
    const { currentAns } = this.state.currentAnswer;
    return(
      <div className={`container-fluid class=${this.state.visibility}`}>
        <div className="gameBackground row align-items-center justify-content-md-center">
          <div className="card col-lg-4 col-md-5 col-sm-9 col-xs-12 triviaCard animated slideInLeft">
            <div className="card-block">{question}</div>

            <AnswerList answers={answers} currentAns={currentAns} updateAnswer={this.updateAnswer} />

            <div className="screen-bottom">
              <button disabled={currentAns === ''} onClick={this.sendAnswer} >
                Submit (<Timer seconds={time} />)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TriviaCard.propTypes = propTypes;
TriviaCard.defaultProps = defaultProps;

export default TriviaCard;

