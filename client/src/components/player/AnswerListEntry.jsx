import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const AnswerListEntry = ({ answer, index, selected, updateAnswer }) => (
  <li
    className={`list-group-item answer ${selected}`}
    tabIndex={index}
    onClick={updateAnswer}
  >
    {answer}
  </li>
);

AnswerListEntry.propTypes = propTypes;

export default AnswerListEntry;
