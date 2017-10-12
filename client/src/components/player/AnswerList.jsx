import React from 'react';
import PropTypes from 'prop-types';
import AnswerListEntry from './AnswerListEntry';

const propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAns: PropTypes.string.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const AnswerList = ({ answers, currentAns, updateAnswer }) => (
  <ul className="list-group list-group-flush">
    {answers.map((answer, index) => (
      <AnswerListEntry
        key={answer}
        answer={answer}
        index={index}
        selected={answer === currentAns}
        updateAnswer={() => updateAnswer(answer)}
      />
    ))}
  </ul>
);

AnswerList.propTypes = propTypes;

export default AnswerList;
