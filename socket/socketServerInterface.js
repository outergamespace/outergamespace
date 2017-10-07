const socketIO = require('socket.io');
const Trivia = require('../game/trivia.js');

/* GAME CONTROLS */

const TIME_FOR_QS = 5 * 1000;
const TIME_FOR_SHOW_ANS = 3 * 1000;
const TIME_FOR_SCORES = 5 * 1000;

/* UTIL FUNCTIONS */

const getRoom = socket => Object.keys(socket.rooms).filter(roomId => roomId !== socket.id)[0];

/* CLASS DEFINITION */

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

  /* HELPER FUNCTIONS */

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

  /* EVENT LISTENERS */

  listenToPregameEvents() {
    this.io.on('connection', (socket) => {
      socket.on('createRoom', this.createRoomHandler.bind(this, socket));
      socket.on('joinRoom', this.joinRoomHandler.bind(this, socket));
    });
  }

  listenToHostEvents(socket) {
    socket.on('startGame', this.startGameHandler.bind(this, socket));
    socket.on('endGame', this.endGameHandler.bind(this, socket));
    // socket.on('disconnect', this.hostDisconnectHandler.bind(this, socket));
  }

  listenToPlayerEvents(socket) {
    socket.on('submitAnswer', this.submitAnswerHandler.bind(this, socket));
    socket.on('leaveGame', this.leaveGameHandler.bind(this, socket));
    socket.on('disconnecting', this.leaveGameHandler.bind(this, socket));
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
      callback();

      socket.join(roomId);
      this.listenToPlayerEvents(socket);

      this.updatePlayersEmitter(roomId);
    } catch (error) {
      // unsuccessful
      callback(error.message);
    }
  }

  /* EVENT HANDLERS - HOST */

  startGameHandler(socket) {
    this.nextQuestionEmitter(socket);
  }

  endGameHandler(socket) {
    const roomId = getRoom(socket);
    socket.leave(roomId);

    this.trivia.endGame(roomId);
  }

  /* EVENT HANDLERS - PLAYER */

  submitAnswerHandler(socket, answer) {
    const game = this.getGame(socket);

    game.receiveAnswer(socket.id, answer);

    if (game.allAnswered()) {
      this.scheduleEmission(this.showAnswerEmitter.bind(this, socket), 0);
    }
  }

  leaveGameHandler(socket) {
    const roomId = getRoom(socket);
    const game = this.getGame(socket);

    socket.leave(roomId);

    game.removePlayer(socket.id);
    this.updatePlayersEmitter(roomId);
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

      this.scheduleEmission(this.nextQuestionEmitter.bind(this, socket), TIME_FOR_SCORES);
    }
  }
}

module.exports = SocketServerInterface;

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
