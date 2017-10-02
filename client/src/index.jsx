import React from 'react';
import ReactDOM from 'react-dom';
import PreGame from './components/presenter/PreGame.jsx';

// TODO import component files

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    // screen: will be 'venue' or 'player'
    // first to sign in is presenter, then change state to player?
    };
  }

  render() {
    return (
      <div>
        <PreGame players={this.props.players} />
      </div>
    );
  }
}


// use this dummy data until DB is connected
const players = [{
  name: 'player1',
  score: 0,
  avatar: 'avatar',
},
{
  name: 'player1',
  score: 0,
  avatar: 'avatar',
},
{
  name: 'player1',
  score: 0,
  avatar: 'avatar',
},
{
  name: 'player1',
  score: 0,
  avatar: 'avatar',
},
];

ReactDOM.render(<App players={players} />, document.getElementById('app'));
