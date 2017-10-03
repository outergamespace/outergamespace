import React from 'react';

const AnswerListEntry = (props) => {
  return (
    <div className="answer-list-entry">
      <div className="answer-list-entry-answer">{props.answer.text}</div>
    </div>
  );
};

export default AnswerListEntry;
