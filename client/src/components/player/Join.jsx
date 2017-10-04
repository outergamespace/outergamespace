import React from 'react';
import Wait from './Wait.jsx';
import io from '../../../../socket/socketClientInterface.js';

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
    io.emit('joinGame', this.state.username, (joined) => {
      // if successfully joined, update state
      this.setState({ joined });
    });
  }

  render() {
    if (this.state.joined === true) {
      return <Wait />;
    }

    return (
      <div>
        <div>
          <label htmlFor="">
            Choose a name:
            <input type="text" value={this.state.username} onChange={this.updateInput} />
            {this.state.joined === false ? <div>Username already taken</div> : '' }
          </label>
        </div>
        <div>
          <button onClick={this.sendName} >Join</button>
        </div>
      </div>
    );
  }
}

export default Join;
