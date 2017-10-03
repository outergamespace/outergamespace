import React from 'react';

import AnswerListEntry from './AnswerListEntry';

const AnswerList = (props) => (
  <div className="player-list">
    {props.answers.map((answer, k) => <AnswerListEntry answer={answer} key={k} /> )}
  </div>
);

export default AnswerList;
