import React from 'react';
import io from 'socket.io-client';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      joined: null,
    };

    /* METHOD BINDING */
    this.updateInput = this.updateInput.bind(this);
    this.sendName = this.sendName.bind(this);
  }

  updateInput(event) {
    this.setState({
      username: event.target.value,
    });
  }

  sendName() {
    const connection = io.connect('http://10.6.70.110:3000');
    connection.emit('joinGame', { username: this.state.username });
    connection.on('validUsername', () => {
      this.setState({
        joined: true,
      });
    });
    connection.on('invalidUsername', () => {
      this.setState({
        joined: false,
      });
    });
  }

  render() {
    if (this.state.joined === true) {
      return <div>You have joined the game.</div>;
    }

    return (
      <div>
        <div>
          <label htmlFor="">
            Choose a name:
            <input type="text" onChange={this.updateInput} />
            {this.state.joined === false ? 'Username already taken' : '' }
          </label>
        </div>
        <div>
          <button onClick={this.sendName} >JOIN</button>
        </div>
      </div>
    );
  }
}

export default Join;
