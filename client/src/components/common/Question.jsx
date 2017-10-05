import React from 'react';
import PropTypes from 'prop-types';
import io from '../../../../socket/socketClientInterface.js';
import Timer from './Timer.jsx';
// timer component renders 20 second countdown after loading

const propTypes = {
  presenterFlag: PropTypes.bool.isRequired,
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
      answer: '',
    };

    /* METHOD BINDING */
    this.handleChange = this.handleChange.bind(this);
    this.isPresenter = this.isPresenter.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
  }

  handleChange(event) {
    this.setState({
      answer: event.target.value,
    });
  }

  isPresenter() {
    return this.props.presenterFlag ? 'presenter' : 'player';
  }

  sendAnswer() {
    this.props.setScreen('answered');
    io.emit('submitAnswer', this.props.username, this.state.answer);
  }

  render() {
    const { question, answers } = this.props;
    const { answer } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div >{question}</div>
          <Timer />
        </div>
        <div className="row">
          <div className="answer">
            {answers.map((option, index) => (
              <label htmlFor={`answer${index}`} className="row" key={option} >
                <input
                  type="radio"
                  name="answer"
                  id={`answer${index}`}
                  value={option}
                  checked={answer === option}
                  className={this.isPresenter()}
                  onChange={this.handleChange}
                />
                {option}
              </label>
            ))}
          </div>
          <div>
            <button onClick={this.sendAnswer} >Submit</button>
          </div>
          <div className="hide-on-player row-item">
            answered player checklist goes here
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = propTypes;
Question.defaultProps = defaultProps;

export default Question;
