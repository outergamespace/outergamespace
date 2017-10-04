import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      on: false,
      time: 20,
    };
    this.start = this.start.bind(this);
    this.decrementer = this.decrementer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  start() {
    this.setState({ on: true });
  }
  decrementer() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
      // TODO change background to yellow at 5 sec and red at 1
    }
  }
  // timer will begin countdown when page displays
  componentDidMount() {
    this.countdown(true);
    setInterval(() => this.countdown(false), 20000);
  }
  // Call with 'true' to start countdown or false to stop
  countdown() {
    setInterval(this.decrementer, 1000);
  }

  render() {
    return (
      <div>
        <h3>Timer</h3>
        <div className="time">
          {this.state.time}
        </div>
        seconds remaining
      </div>
    );
  }
}

export default Timer;
