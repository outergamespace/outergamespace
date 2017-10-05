const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const game = require('../game/game.js');
const Player = require('../game/player.js');

/* SERVER SETUP */

const CLIENT_DIR = path.join(__dirname, '../client');
const SERVER_PORT = 8080;
const SOCKET_PORT = 3000;

io.listen(SOCKET_PORT);
server.listen(SERVER_PORT);
console.log(`Socket listening on port ${SOCKET_PORT}`);
console.log(`Server listening on port ${SERVER_PORT}`);

/* MIDDLEWARE */

app.use(express.static(CLIENT_DIR));
app.use((req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

/* GAME CONTROLS */

const TIME_FOR_QS = 5 * 1000;
const TIME_FOR_SHOW_ANS = 3 * 1000;
const TIME_FOR_SCORES = 5 * 1000;

/* ROUTE HANDLERS */

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index_presenter.html'));
});

app.get('/join', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index_player.html'));
});

/* SOCKET EVENT HANDLERS */

const joinGameHandler = (username, cb) => {
  try {
    game.addPlayer(new Player(username));

    // notify player that he/she joined the game
    cb(true);

    // notify presenter of new player joining
    io.emit('updatePlayers', game.getScores());
  } catch (err) {
    // notify player that name is already taken
    cb(false);
  }
};

let nextStep;

const nextQuestionHandler = () => {
  const question = game.nextQuestion();

  if (question) {
    // send question to all clients
    io.emit('nextQuestion', question);

    // show answer after given time period
    nextStep = setTimeout(showAnswerHandler, TIME_FOR_QS);
  } else {
    // send final scores
    const scores = game.getScores();
    io.emit('showFinalScores', scores);
  }
};

const showAnswerHandler = () => {
  const correctAns = game.getCurrentQuestion().correct_ans;
  io.emit('showAnswer', correctAns);

  // show scores after given time period
  nextStep = setTimeout(showScoresHandler, TIME_FOR_SHOW_ANS);
};

const showScoresHandler = () => {
  const scores = game.getScores();

  io.emit('showRoundScores', scores);

  // show next question after given time period
  nextStep = setTimeout(nextQuestionHandler, TIME_FOR_SCORES);
};

const submitAnswerHandler = (username, answer) => {
  game.receiveAnswer(username, answer);

  if (game.allAnswered()) {
    // end the question early
    clearTimeout(nextStep);
    showAnswerHandler();
  }
};

const restartHandler = () => {
  game.restart();
};

/* SOCKET EVENT LISTENERS */

io.on('connection', (socket) => {
  socket.emit('updatePlayers', game.getScores());

  // player clicks 'join' button
  socket.on('joinGame', joinGameHandler);

  // presenter clicks 'start' button
  socket.on('startGame', nextQuestionHandler);

  // player submits answer
  socket.on('submitAnswer', submitAnswerHandler);

  // presenter clicks 'restart' button
  socket.on('restartGame', restartHandler);
});

// Export for testing
module.exports = server;
