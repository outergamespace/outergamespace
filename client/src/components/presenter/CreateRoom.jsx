import React from 'react';
import PropTypes from 'prop-types';

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
    };

    /* METHOD BINDING */
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(event, stateName) {
    const newState = event.target.value;
    if (newState === '' || !isNaN(newState)) {
      this.setState({
        [stateName]: newState,
      });
    }
  }

  render() {
    const { createRoom } = this.props;
    const { noOfQuestions, timePerQuestion, maxPlayers } = this.state;
    return (
      <div className="screen">
        <div className="screen-top" >Game Settings</div>

        <div className="screen-middle screen-bordered" >
          <div className="table">
            <div className="table-col">
              <div className="table-row">No. of Questions</div>
              <div className="table-row">Time per Question</div>
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
        </div>

        <div className="screen-bottom">
          <button onClick={createRoom} >Create Room</button>
        </div>
      </div>
    );
  }
}

CreateRoom.propTypes = propTypes;

export default CreateRoom;
