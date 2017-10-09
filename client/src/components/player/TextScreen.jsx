import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  btnOnClick: PropTypes.func,
};

const defaultProps = {
  btnText: '',
  btnOnClick: () => {},
};

const TextScreen = ({ text, btnText, btnOnClick }) => (
  <div className="screen">
    <div className="screen-top" />

    <div className="screen-middle text-screen">{text}</div>

    <div className="screen-bottom">
      {btnText && <button onClick={btnOnClick} >{btnText}</button>}
    </div>
  </div>
);

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default TextScreen;
