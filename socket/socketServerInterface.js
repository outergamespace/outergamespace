const socketIO = require('socket.io');
const Trivia = require('../game/trivia.js');

/* GAME CONTROLS */

const TIME_FOR_QS = 5 * 1000;
const TIME_FOR_SHOW_ANS = 3 * 1000;
const TIME_FOR_SCORES = 5 * 1000;

/* UTIL FUNCTIONS */
const getRoom = socket => Object.keys(socket.rooms).filter(roomId => roomId !== socket.id)[0];

class SocketServerInterface {
  constructor(server) {
    this.io = socketIO(server);
    this.trivia = new Trivia();
    this.scheduledEmission = null;
  }

  listen(port) {
    this.io.listen(port);
    this.listenToPregameEvents();
  }

  /* EVENT LISTENERS */

  listenToPregameEvents() {
    this.io.on('connection', (socket) => {
      socket.on('createRoom', this.createRoomHandler.bind(this, socket));
      socket.on('joinRoom', this.joinRoomHandler.bind(this, socket));
    });
  }

  listenToHostEvents(socket) {
    socket.on('startGame', this.startGameHandler.bind(this, socket));
    // socket.on('restartGame', this.restartGameHandler.bind(this, socket));
    // socket.on('disconnect', this.hostDisconnectHandler.bind(this, socket));
  }

  listenToPlayerEvents(socket) {
    // socket.on('submitAnswer', this.submitAnswerHandler.bind(this, socket));
    // socket.on('disconnect', this.playerDisconnectHandler.bind(this, socket));
  }

  /* EVENT HANDLERS - PREGAME */

  createRoomHandler(socket, callback) {
    const roomId = this.trivia.createRoom(socket.id);

    callback(null, roomId);

    socket.join(roomId);
    this.listenToHostEvents(socket);
  }

  joinRoomHandler(socket, roomId, username, callback) {
    try {
      this.trivia.joinGame(socket.id, roomId, username);

      // successful
      callback(null, roomId);

      socket.join(roomId);
      this.listenToPlayerEvents(socket);

      this.updatePlayersEmitter(roomId);
    } catch (error) {
      // unsuccessful
      callback(error.message, null);
    }
  }

  /* EVENT HANDLERS - HOST */

  startGameHandler(socket) {
    this.nextQuestionEmitter(socket);
  }

  /* EVENT HANDLERS - PLAYER */

  /* EVENT EMITTERS - HELPERS */

  getGame(socketOrRoomId) {
    const roomId = typeof socketOrRoomId === 'object' ? getRoom(socketOrRoomId) : socketOrRoomId;
    return this.trivia.getGame(roomId);
  }

  scheduleEmission(emitter, time) {
    clearTimeout(this.scheduledEmission);
    this.scheduledEmission = setTimeout(emitter, time);
  }

  emitToRoom(socketOrRoomId, event, ...args) {
    const roomId = typeof socketOrRoomId === 'object' ? getRoom(socketOrRoomId) : socketOrRoomId;
    this.io.to(roomId).emit(event, ...args);
  }

  /* EVENT EMITTERS */

  updatePlayersEmitter(roomId) {
    const game = this.getGame(roomId);
    this.emitToRoom(roomId, 'updatePlayers', game.getScores(roomId));
  }

  nextQuestionEmitter(socket) {
    const game = this.getGame(socket);
    this.emitToRoom(socket, 'nextQuestion', game.nextQuestion());

    this.scheduleEmission(this.showAnswerEmitter.bind(this, socket), TIME_FOR_QS);
  }

  showAnswerEmitter(socket) {
    const game = this.getGame(socket);
    this.emitToRoom(socket, 'showAnswer', game.getAnswer());

    this.scheduleEmission(this.showScoresEmitter.bind(this, socket), TIME_FOR_SHOW_ANS);
  }

  showScoresEmitter(socket) {
    const game = this.getGame(socket);

    if (game.atLastQuestion()) {
      this.emitToRoom(socket, 'showFinalScores', game.getScores());
    } else {
      this.emitToRoom(socket, 'showRoundScores', game.getScores());

      this.scheduleEmission(this.nextQuestionEmitter.bind(this, socket), TIME_FOR_SHOW_ANS);
    }
  }
}

module.exports = SocketServerInterface;


// const express = require('express');

// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// const trivia = require('../game/trivia.js');
// const Player = require('../game/player.js');

// /* SOCKET SETUP */

// const SOCKET_PORT = 3000;
// io.listen(SOCKET_PORT);
// console.log(`Socket listening on port ${SOCKET_PORT}`);

// /* GAME CONTROLS */

// const TIME_FOR_QS = 5 * 1000;
// const TIME_FOR_SHOW_ANS = 3 * 1000;
// const TIME_FOR_SCORES = 5 * 1000;

// /* SOCKET EVENT EMITTERS */

// let nextStep;

// const setNextStep = (emitter, time) => {
//   clearTimeout(nextStep);
//   nextStep = setTimeout(emitter, time);
// };

// const emitToRoom = (socket, event, ...args) => {
//   const roomId = trivia.getRoomBySocketId(socket.id);
//   io.to(roomId).emit(event, ...args);
// };

// const updatePlayersEmitter = (socket) => {
//   const game = trivia.getGameBySocketId(socket.id);

//   emitToRoom(socket, 'updatePlayers', game.getScores());
// };

// const nextQuestionEmitter = (socket) => {
//   const game = trivia.getGameBySocketId(socket.id);
//   const question = game.nextQuestion();

//   emitToRoom(socket, 'nextQuestion', question);
//   setNextStep(showAnswerEmitter.bind(null, socket), TIME_FOR_QS);
// };

// const showAnswerEmitter = (socket) => {
//   const game = trivia.getGameBySocketId(socket.id);
//   const correctAns = game.getCurrentQuestion().correct_ans;

//   emitToRoom(socket, 'showAnswer', correctAns);
//   setNextStep(showScoresEmitter.bind(null, socket), TIME_FOR_SHOW_ANS);
// };

// const showScoresEmitter = (socket) => {
//   const game = trivia.getGameBySocketId(socket.id);

//   if (game.atLastQuestion()) {
//     emitToRoom(socket, 'showFinalScores', game.getScores());
//   } else {
//     emitToRoom(socket, 'showRoundScores', game.getScores());
//     setNextStep(nextQuestionEmitter.bind(null, socket), TIME_FOR_SCORES);
//   }
// };

// /* SOCKET EVENT HANDLERS - HOST */

// const startGameHandler = (socket) => {
//   nextQuestionEmitter(socket);
// };

// const restartGameHandler = (socket) => {
//   // TODO
// };

// const hostDisconnectHandler = (socket) => {
//   // TODO
// };

// /* SOCKET EVENT HANDLERS - PLAYER */

// const submitAnswerHandler = (socket, answer) => {
//   const game = trivia.getGameBySocketId(socket.id);

//   game.receiveAnswer(socket.id, answer);

//   if (game.allAnswered()) {
//     // go to next step immediately
//     setNextStep(showAnswerEmitter.bind(null, socket), 0);
//   }
// };

// const playerDisconnectHandler = (socket) => {
//   const game = trivia.getGameBySocketId(socket.id);

//   game.removePlayer(socket.id);

//   updatePlayersEmitter(socket);

//   trivia.removePlayer(socket.id);
// };

// /* SOCKET EVENT HANDLERS - PREGAME */

// const createRoomHandler = (socket, callback) => {
//   const roomId = trivia.createRoom(socket.id);
//   socket.join(roomId);
//   callback(roomId);
//   listenToHostEvents(socket);
// };

// const joinRoomHandler = (socket, roomId, username, callback) => {
//   const game = trivia.getGameByRoomId(roomId);
//   if (game) {
//     if (game.hasPlayer(username)) {
//       callback('Username already taken');
//     } else {
//       trivia.joinGame(socket.id, roomId);
//       game.addPlayer(new Player(socket.id, username));
//       socket.join(roomId);
//       updatePlayersEmitter(socket);
//       callback();
//       listenToPlayerEvents(socket);
//     }
//   } else {
//     callback('Room does not exist');
//   }
// };

// /* SOCKET EVENT LISTENERS */

// const listenToHostEvents = (socket) => {
//   socket.on('startGame', startGameHandler.bind(null, socket));
//   socket.on('restartGame', restartGameHandler.bind(null, socket));
//   socket.on('disconnect', hostDisconnectHandler.bind(null, socket));
// };

// const listenToPlayerEvents = (socket) => {
//   socket.on('submitAnswer', submitAnswerHandler.bind(null, socket));
//   socket.on('disconnect', playerDisconnectHandler.bind(null, socket));
// };

// io.on('connection', (socket) => {
//   socket.on('createRoom', createRoomHandler.bind(null, socket));
//   socket.on('joinRoom', joinRoomHandler.bind(null, socket));
// });

// module.exports = io;
