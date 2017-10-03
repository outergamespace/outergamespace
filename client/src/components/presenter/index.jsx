import React from 'react';
import ReactDOM from 'react-dom';
import PreGame from './PreGame.jsx';
import css from '../../../styles/style.css';


// TODO import component files

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    // screen: will be 'venue' or 'player'
    // first to sign in is presenter, then change state to player?
      screen: 'presenter',
    };
    this.toggleScreen = this.toggleScreen.bind(this);
  }
  // use to change display from presenter to viewer
  toggleScreen() {
    console.log('toggleScreen clicked', this.state.screen);
    if (this.state.screen === 'presenter') {
      this.setState({ screen: 'player' });
    } else {
      this.setState({ screen: 'presenter' });
    }
  }
  render() {
    const screen = this.state.screen;
    let display;
    if (screen === 'presenter') {
      display = <PreGame players={this.props.players} />;
    } else if (screen === 'player') {
      display = 'Player Screen Placeholder';
    } else {
      display = 'Oops, screen is undefined';
    }
    return (
      <div>
        <div>
          {display}
        </div>
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
  name: 'player2',
  score: 0,
  avatar: 'avatar',
},
{
  name: 'player3',
  score: 0,
  avatar: 'avatar',
},
{
  name: 'player4',
  score: 0,
  avatar: 'avatar',
},
];

ReactDOM.render(<App players={players} />, document.getElementById('app'));
