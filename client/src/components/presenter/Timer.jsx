import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  seconds: PropTypes.number.isRequired,
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.seconds,
    };

    /* METHOD BINDING */
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.interval = setInterval(this.decrementTimer, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  decrementTimer() {
    this.setState((prevState) => {
      // stop timer when only 1 second remains
      if (prevState.remainingTime === 1) {
        this.stopTimer();
      }
      return ({
        remainingTime: prevState.remainingTime - 1,
      });
    });
  }

  render() {
    return <span>{this.state.remainingTime}</span>;
  }
}

Timer.propTypes = propTypes;

export default Timer;
