import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  answer: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

const AnswerListEntry = ({ answer, selected }) => (
  <div className={`answer ${selected && 'selected'}`} >
    <div className="checkmark-placeholder" />
    {answer}‎
    {
      selected
        ? <div className="checkmark-placeholder checkmark" >✔</div>
        : <div className="checkmark-placeholder" />
    }
  </div>
);

AnswerListEntry.propTypes = propTypes;

export default AnswerListEntry;
