const express = require('express');

const app = express();
const server = app.listen(8080);
const io = require('socket.io').listen(server);
let { gameInstance } = require('../game/game.js');
const { Game } = require('../game/game.js');
const { Player } = require('../game/player.js');

app.use(express.static(`${__dirname}/../client/`));

// Main web page for the host (projector)
app.get('/', (req, res) => {
  res.status(200);
  res.send();
});

// Main page for clients to join current game
app.get('/join', (req, res) => {
  res.status(200);

  // Check if there is already a game instance
  if (gameInstance !== null) {
    // Allow the use to join through a socket


    // Simulate user passing in their desired username. 
    // Create new player and save them to the game isntancec
    const playerName = `newPlayer${gameInstance.players.length}`;
    gameInstance.addPlayer(new Player(playerName));

    res.send(JSON.stringify(gameInstance));
  } else {
    // Prompt the user that there is not a current game running, redirect user to start new game
    res.send('There is not a current game running');

    // Simulate user being prompted to start a game and create a new GameInstance
    gameInstance = new Game();
  }
});

io.on('connection', (socket) => {
  // Will send back to client a successfull connection made
  socket.emit('status', { connection: 'successful' });

  // socket.on('join', (data) => {
  //   // Data = {username: username}
  // });
});

// Export the server in order to run mocha test
module.exports = server;
