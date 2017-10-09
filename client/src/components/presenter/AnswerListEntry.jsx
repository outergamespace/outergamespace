import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  answer: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

const AnswerListEntry = ({ answer, selected }) => (
  <div className={`answer ${selected && 'selected-ans'}`} >
    {answer}
  </div>
);

AnswerListEntry.propTypes = propTypes;

export default AnswerListEntry;
