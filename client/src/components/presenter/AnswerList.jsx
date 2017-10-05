import React from 'react';
import PropTypes from 'prop-types';
import AnswerListEntry from './AnswerListEntry.jsx';

const propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAns: PropTypes.string.isRequired,
};

const AnswerList = ({ answers, correctAns }) => (
  <div className="player-list">
    {answers.map(answer => (
      <AnswerListEntry
        key={answer}
        answer={answer}
        selected={answer === correctAns}
      />
    ))}
  </div>
);

AnswerList.propTypes = propTypes;

export default AnswerList;
