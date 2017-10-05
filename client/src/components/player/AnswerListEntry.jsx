import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const AnswerListEntry = ({ answer, index, selected, updateAnswer }) => (
  <div
    className={`answer-list-entry ${selected ? 'selectedAns' : ''}`}
    role="menuitemradio"
    aria-checked={selected}
    tabIndex={index}
    onClick={updateAnswer}
  >
    {answer}
  </div>
);

AnswerListEntry.propTypes = propTypes;

export default AnswerListEntry;
