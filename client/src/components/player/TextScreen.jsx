import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
};

const TextScreen = ({ text }) => (
  <div className="screen">
    <div className="screen-top" />

    <div className="screen-middle text-screen">{text}</div>

    <div className="screen-bottom" />
  </div>
);

TextScreen.propTypes = propTypes;

export default TextScreen;
