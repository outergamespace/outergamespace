import React from 'react';

class Lobby extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.username
    }
  }

  render() {
    return (
      <div>
        <h1>Lobby Goes here</h1>
        <p>welcome {this.state.username}</p>
      </div>
    )
  }
}

export default Lobby;