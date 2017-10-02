import React from 'react';
import ReactDOM from 'react-dom';

//TODO import component files

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// screen: will be 'venue' or 'player'
			//TODO - how do we decide which it will be?
			// first to sign in?, then change state to player?
		};
	}
  render() {
    return (
      <div>Hello World</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));