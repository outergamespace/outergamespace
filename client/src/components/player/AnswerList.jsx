import React from 'react';
import PropTypes from 'prop-types';
import AnswerListEntry from './AnswerListEntry.jsx';

const propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAns: PropTypes.string.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const AnswerList = ({ answers, currentAns, updateAnswer }) => (
  <div className="player-list">
    {answers.map((answer, index) => (
      <AnswerListEntry
        key={answer}
        answer={answer}
        index={index}
        selected={answer === currentAns}
        updateAnswer={() => updateAnswer(answer)}
      />
    ))}
  </div>
);

AnswerList.propTypes = propTypes;

export default AnswerList;
