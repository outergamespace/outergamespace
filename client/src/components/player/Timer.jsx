import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 20,
      class: 'timer center',
    };

    this.decrementer = this.decrementer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  // timer will begin countdown when page displays
  componentDidMount() {
    this.countdown(this.state.time);
  }

  decrementer() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
      if (this.state.time < 10) {
        this.setState({ class: 'timer center warn' });
      }
      if (this.state.time < 6) {
        this.setState({ class: 'timer center danger' });
      }
    }
  }
  // Call with time in seconds, use 0 to stop
  countdown(seconds) {
    // set interval, calling decrementor
    const timer = setInterval(this.decrementer, 1000);
    // setTimeout to clear set setInterval
    setTimeout(() => clearInterval(timer), seconds * 1000);
  }

  render() {
    return (
      <div>
        <div className={this.state.class}>
          Time Left
          <div className="time">
            {this.state.time}
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
