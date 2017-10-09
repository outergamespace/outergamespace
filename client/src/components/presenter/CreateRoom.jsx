import React from 'react';
import PropTypes from 'prop-types';
import io from '../../../../socket/socketClientInterface';

const propTypes = {
  createRoom: PropTypes.func.isRequired,
};

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfQuestions: '10',
      timePerQuestion: '15',
      maxPlayers: '6',
      errMsg: '',
    };

    /* METHOD BINDING */
    this.onChangeInput = this.onChangeInput.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  onChangeInput(event, stateName) {
    const newState = event.target.value;
    if (newState === '' || !isNaN(newState)) {
      this.setState({
        [stateName]: newState,
      });
    }
  }

  getConfig() {
    const { noOfQuestions, timePerQuestion, maxPlayers } = this.state;
    return {
      noOfQuestions,
      timePerQuestion,
      maxPlayers,
    };
  }

  createRoom() {
    io.emit('createRoom', this.getConfig(), (errMsg, roomId) => {
      if (errMsg) {
        this.setState({ errMsg });
      } else {
        this.props.createRoom(roomId);
      }
    });
  }

  render() {
    const { noOfQuestions, timePerQuestion, maxPlayers, errMsg } = this.state;
    return (
      <div className="screen">
        <div className="screen-top" >Game Settings</div>

        <div className="screen-middle screen-bordered" >
            <div className="table-body">
              <div className="table-col">
                <div className="table-row">No. of Questions</div>
                <div className="table-row">Time per Question (Seconds)</div>
                <div className="table-row">Maximum No. of Players</div>
              </div>

              <div className="table-col table-input">
                <div className="table-row">
                  <input
                    type="text"
                    value={noOfQuestions}
                    placeholder="10"
                    onChange={e => this.onChangeInput(e, 'noOfQuestions')}
                  />
                </div>

                <div className="table-row">
                  <input
                    type="text"
                    value={timePerQuestion}
                    placeholder="15"
                    onChange={e => this.onChangeInput(e, 'timePerQuestion')}
                  />
                </div>

                <div className="table-row">
                  <input
                    type="text"
                    value={maxPlayers}
                    placeholder="6"
                    onChange={e => this.onChangeInput(e, 'maxPlayers')}
                  />
                </div>
              </div>
            </div>

            {errMsg && <div className="table-footer err-msg">{errMsg}</div>}
        </div>

        <div className="screen-bottom">
          <button onClick={this.createRoom} >Create Room</button>
        </div>
      </div>
    );
  }
}

CreateRoom.propTypes = propTypes;

export default CreateRoom;
