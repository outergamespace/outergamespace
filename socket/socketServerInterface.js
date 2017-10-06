const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const trivia = require('../game/trivia.js');
const Player = require('../game/player.js');

/* SOCKET SETUP */

const SOCKET_PORT = 3000;
io.listen(SOCKET_PORT);
console.log(`Socket listening on port ${SOCKET_PORT}`);

/* GAME CONTROLS */

const TIME_FOR_QS = 5 * 1000;
const TIME_FOR_SHOW_ANS = 3 * 1000;
const TIME_FOR_SCORES = 5 * 1000;

/* SOCKET EVENT EMITTERS */

let nextStep;

const setNextStep = (emitter, time) => {
  clearTimeout(nextStep);
  nextStep = setTimeout(emitter, time);
};

const emitToRoom = (socket, event, ...args) => {
  const roomId = trivia.getRoomBySocketId(socket.id);
  io.to(roomId).emit(event, ...args);
};

const updatePlayersEmitter = (socket) => {
  const game = trivia.getGameBySocketId(socket.id);

  emitToRoom(socket, 'updatePlayers', game.getScores());
};

const nextQuestionEmitter = (socket) => {
  const game = trivia.getGameBySocketId(socket.id);
  const question = game.nextQuestion();

  emitToRoom(socket, 'nextQuestion', question);
  setNextStep(showAnswerEmitter.bind(null, socket), TIME_FOR_QS);
};

const showAnswerEmitter = (socket) => {
  const game = trivia.getGameBySocketId(socket.id);
  const correctAns = game.getCurrentQuestion().correct_ans;

  emitToRoom(socket, 'showAnswer', correctAns);
  setNextStep(showScoresEmitter.bind(null, socket), TIME_FOR_SHOW_ANS);
};

const showScoresEmitter = (socket) => {
  const game = trivia.getGameBySocketId(socket.id);

  if (game.atLastQuestion()) {
    emitToRoom(socket, 'showFinalScores', game.getScores());
  } else {
    emitToRoom(socket, 'showRoundScores', game.getScores());
    setNextStep(nextQuestionEmitter.bind(null, socket), TIME_FOR_SCORES);
  }
};

/* SOCKET EVENT HANDLERS - HOST */

const startGameHandler = (socket) => {
  nextQuestionEmitter(socket);
};

const restartGameHandler = (socket) => {
  // TODO
};

const hostDisconnectHandler = (socket) => {
  // TODO
};

/* SOCKET EVENT HANDLERS - PLAYER */

const submitAnswerHandler = (socket, answer) => {
  const game = trivia.getGameBySocketId(socket.id);

  game.receiveAnswer(socket.id, answer);

  if (game.allAnswered()) {
    // go to next step immediately
    setNextStep(showAnswerEmitter.bind(null, socket), 0);
  }
};

const playerDisconnectHandler = (socket) => {
  const game = trivia.getGameBySocketId(socket.id);

  game.removePlayer(socket.id);

  updatePlayersEmitter(socket);

  trivia.removePlayer(socket.id);
};

/* SOCKET EVENT HANDLERS - PREGAME */

const createRoomHandler = (socket, callback) => {
  const roomId = trivia.createRoom(socket.id);
  socket.join(roomId);
  callback(roomId);
  listenToHostEvents(socket);
};

const joinRoomHandler = (socket, roomId, username, callback) => {
  const game = trivia.getGameByRoomId(roomId);
  if (game) {
    if (game.hasPlayer(username)) {
      callback('Username already taken');
    } else {
      trivia.joinGame(socket.id, roomId);
      game.addPlayer(new Player(socket.id, username));
      socket.join(roomId);
      updatePlayersEmitter(socket);
      callback();
      listenToPlayerEvents(socket);
    }
  } else {
    callback('Room does not exist');
  }
};

/* SOCKET EVENT LISTENERS */

const listenToHostEvents = (socket) => {
  socket.on('startGame', startGameHandler.bind(null, socket));
  socket.on('restartGame', restartGameHandler.bind(null, socket));
  socket.on('disconnect', hostDisconnectHandler.bind(null, socket));
};

const listenToPlayerEvents = (socket) => {
  socket.on('submitAnswer', submitAnswerHandler.bind(null, socket));
  socket.on('disconnect', playerDisconnectHandler.bind(null, socket));
};

io.on('connection', (socket) => {
  // if (trivia.isHost(socket.id)) {
  //   socket.on('startGame', startGameHandler.bind(null, socket));
  //   socket.on('restartGame', restartGameHandler.bind(null, socket));
  //   socket.on('disconnect', hostDisconnectHandler.bind(null, socket));
  // } else if (trivia.isPlayer(socket.id)) {
  //   socket.on('submitAnswer', submitAnswerHandler.bind(null, socket));
  //   socket.on('disconnect', playerDisconnectHandler.bind(null, socket));
  // } else {
    socket.on('createRoom', createRoomHandler.bind(null, socket));
    socket.on('joinRoom', joinRoomHandler.bind(null, socket));
  // }
});

module.exports = io;
