import React from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';
import AnsweredPlayerList from './AnsweredPlayerList';
import Timer from './Timer';
import io from '../../../../socket/socketClientInterface';

const propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    const { question, answers, players } = this.props;
    const { correctAns } = this.state;
    return (
      <div className="screen screen-horizontal">
        <div className="screen-main">
          <div className="screen-top">
            {question}
          </div>

          <AnswerList answers={answers} correctAns={correctAns} />
        </div>

        <div className="screen-sidebar">
          <div className="screen-top screen-bordered">
            <Timer seconds={20} />
          </div>

          <div className="screen-middle screen-bordered">
            <AnsweredPlayerList players={players} />
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = propTypes;

export default Question;
