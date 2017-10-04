const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const game = require('../game/game.js');
const { Player } = require('../game/player.js');

const CLIENT_DIR = path.join(__dirname, '../client');
const SERVER_PORT = 8080;
const SOCKET_PORT = 3000;
const TIME_FOR_QS = 20 * 1000;
const TIME_FOR_SCORES = 3 * 1000;

io.listen(SOCKET_PORT);
server.listen(SERVER_PORT);
console.log(`Socket listening on port ${SOCKET_PORT}`);
console.log(`Server listening on port ${SERVER_PORT}`);

app.use(express.static(CLIENT_DIR));
app.use((req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

/* ROUTE HANDLERS */

// Main web page for the host (projector)
app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index_presenter.html'));
});

// Main page for clients to join current game
app.get('/join', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index_player.html'));
});

/* SOCKET EVENT HANDLERS */

const joinGameHandler = (socket, user) => {
  try {
    game.addPlayer(new Player(user.username));

    // notify player that he/she joined the game
    socket.emit('validUsername', {});

    // notify presenter of new player joining
    io.emit('newPlayer', user);
  } catch (err) {
    // notify player that name is already taken
    socket.emit('invalidUsername', {});
  }
  console.log(game.players);
};

let nextStep;

const nextQuestionHandler = () => {
  const question = game.nextQuestion();

  if (question) {
    // send question to all clients
    io.emit('nextQuestion', { question });

    // set next step
    nextStep = setTimeout(showScoresHandler, TIME_FOR_QS);
  } else {
    // send final scores
    const scores = game.getScores();
    io.emit('showFinalScores', { scores });
  }
};

const showScoresHandler = () => {
  const scores = game.getScores();
  io.emit('showScores', { scores });

  // set next step
  nextStep = setTimeout(nextQuestionHandler, TIME_FOR_SCORES);
};

const submitAnswerHandler = ({ username, answer }) => {
  game.receiveAnswer(username, answer);

  if (game.allAnswered()) {
    // end the question early
    clearTimeout(nextStep);
    showScoresHandler();
  }
};

/* SOCKET EVENTS */

io.on('connection', (socket) => {
  // Will send back to client a successful connection made
  socket.emit('status', { connection: 'successful' });

  // player clicks 'join' button
  socket.on('joinGame', joinGameHandler);

  // presenter clicks 'start' button
  socket.on('startGame', nextQuestionHandler);

  // player submits answer
  socket.on('submitAnswer', submitAnswerHandler);
});

// Export the server in order to run mocha test
module.exports = server;
