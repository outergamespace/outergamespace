import React from 'react';
import PropTypes from 'prop-types';
import io from '../../../../socket/socketClientInterface.js';

const propTypes = {
  setWaitScreen: PropTypes.func.isRequired,
};

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      errMsg: false,
    };

    /* METHOD BINDING */
    this.updateInput = this.updateInput.bind(this);
    this.showErrMsg = this.showErrMsg.bind(this);
    this.sendName = this.sendName.bind(this);
  }

  updateInput(event) {
    this.setState({
      username: event.target.value,
    });
  }

  showErrMsg() {
    this.setState({
      errMsg: true,
    });
  }

  sendName() {
    io.emit('joinGame', io.id, this.state.username, (joined) => {
      if (joined) {
        // joined game successfully
        this.props.setWaitScreen();
      } else {
        // username already taken
        this.showErrMsg();
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="join">
            Choose a name
            <input
              className="join"
              id="join"
              type="text"
              value={this.state.username}
              onChange={this.updateInput}
            />

            {this.state.errMsg ? <div>Username already taken</div> : '' }
          </label>
        </div>
        <div>
          <button onClick={this.sendName} >Join</button>
        </div>
      </div>
    );
  }
}

Join.propTypes = propTypes;

export default Join;
