const socketIO = require('socket.io');
const Trivia = require('../game/trivia.js');
const openTriviaDB = require('../helpers/openTriviaDb.js');

/* GAME CONTROLS */

const TIME_FOR_SHOW_ANS = 3 * 1000;
const TIME_FOR_SCORES = 5 * 1000;

/* HELPER FUNCTIONS */

const getRoom = socket => Object.keys(socket.rooms).filter(roomId => roomId !== socket.id)[0];

/* CLASS DEFINITION */

class SocketServerInterface {
  constructor(server, options) {
    this.io = socketIO(server, options);
    this.trivia = new Trivia();
    openTriviaDB.fetchCategories()
      .then((categories) => {
        this.triviaCategories = categories;
      })
      .catch(console.error);
    this.scheduledEmission = null;
  }

  // port can be undefined here, if we want to route all comm through the HTTP server port
  listen(port = undefined) {
    if (port) {
      this.io.listen(port);
    }
    this.listenForPregameEvents();
  }

  /* HELPER FUNCTIONS */

  getGame(socketOrRoomId) {
    const roomId = typeof socketOrRoomId === 'object' ? getRoom(socketOrRoomId) : socketOrRoomId;
    return this.trivia.getGame(roomId);
  }

  scheduleEmission(emitter, time) {
    this.clearEmission();
    this.scheduledEmission = setTimeout(emitter, time);
  }

  clearEmission() {
    clearTimeout(this.scheduledEmission);
  }

  emitToRoom(socketOrRoomId, event, ...args) {
    const roomId = typeof socketOrRoomId === 'object' ? getRoom(socketOrRoomId) : socketOrRoomId;
    this.io.to(roomId).emit(event, ...args);
  }

  /* EVENT LISTENERS */

  listenForPregameEvents() {
    this.io.on('connection', (socket) => {
      socket.on('createRoom', this.handleCreateRoom.bind(this, socket));
      socket.on('joinRoom', this.handleJoinRoom.bind(this, socket));
    });
  }

  listenForHostEvents(socket) {
    socket.on('startGame', this.handleStartGame.bind(this, socket));
    socket.on('endGame', this.handleEndGame.bind(this, socket));
    socket.on('disconnecting', this.handleHostDisconnect.bind(this, socket));
  }

  listenForPlayerEvents(socket) {
    socket.on('submitAnswer', this.handleSubmitAnswer.bind(this, socket));
    socket.on('leaveGame', this.handleLeaveGame.bind(this, socket));
    socket.on('disconnecting', this.handlePlayerDisconnect.bind(this, socket));
  }

  /* EVENT HANDLERS - PREGAME */

  handleCreateRoom(socket, config, callback) {
    try {
      const roomId = this.trivia.createRoom(config);

      callback(null, roomId);

      socket.join(roomId);
      this.listenForHostEvents(socket);
    } catch (error) {
      callback(error.message);
    }
  }

  handleJoinRoom(socket, roomId, username, callback) {
    try {
      this.trivia.joinGame(socket.id, roomId, username);
      const game = this.getGame(roomId);

      socket.join(roomId);
      this.listenForPlayerEvents(socket);

      this.emitUpdatePlayers(roomId);

      // successful
      callback(null, game.getTimePerQuestion());
    } catch (error) {
      // unsuccessful
      callback(error.message);
    }
  }

  /* EVENT HANDLERS - HOST */

  handleStartGame(socket, callback) {
    const game = this.getGame(socket);

    if (game.hasNoPlayers()) {
      callback('There are no players in the room');
    } else {
      callback(null);
      this.emitNextQuestion(socket);
    }
  }

  handleEndGame(socket, callback) {
    const roomId = getRoom(socket);
    socket.leave(roomId);

    this.trivia.endGame(roomId);
    callback(null);
  }

  handleHostDisconnect(socket) {
    this.clearEmission();
    this.emitHostDisconnect(socket);
    this.handleEndGame(socket, () => {});
  }

  /* EVENT HANDLERS - PLAYER */

  handleSubmitAnswer(socket, answer, callback) {
    const game = this.getGame(socket);

    game.receiveAnswer(socket.id, answer);

    this.emitUpdatePlayers(socket);

    callback();

    if (game.allAnswered()) {
      this.scheduleEmission(this.emitShowAnswer.bind(this, socket), 0);
    }
  }

  handlePlayerDisconnect(socket) {
    const roomId = getRoom(socket);
    const game = this.getGame(socket);

    if (game) {
      // if game has not yet ended
      game.removePlayer(socket.id);
      this.emitUpdatePlayers(roomId);
    }
  }

  handleLeaveGame(socket, callback) {
    this.handlePlayerDisconnect(socket);

    const roomId = getRoom(socket);
    socket.leave(roomId);
    callback();
  }

  /* EVENT EMITTERS */

  emitUpdatePlayers(socketOrRoomId) {
    const game = this.getGame(socketOrRoomId);
    this.emitToRoom(socketOrRoomId, 'updatePlayers', game.getPlayers());
  }

  emitNextQuestion(socket) {
    const game = this.getGame(socket);
    this.emitToRoom(socket, 'nextQuestion', game.nextQuestion(), game.getPlayers());

    this.scheduleEmission(this.emitShowAnswer.bind(this, socket), game.getTimePerQuestion() * 1000);
  }

  emitReceiveAnswer(socket) {
    const game = this.getGame(socket);
    this.emitToRoom(socket, 'receiveAnswer', game.getAnswerPlayers());
  }

  emitShowAnswer(socket) {
    const game = this.getGame(socket);
    this.emitToRoom(socket, 'showAnswer', game.getAnswer());

    this.scheduleEmission(this.emitShowScores.bind(this, socket), TIME_FOR_SHOW_ANS);
  }

  emitShowScores(socket) {
    const game = this.getGame(socket);

    if (game.atLastQuestion()) {
      this.emitToRoom(socket, 'showFinalScores', game.getPlayers());
    } else {
      this.emitToRoom(socket, 'showRoundScores', game.getPlayers());

      this.scheduleEmission(this.emitNextQuestion.bind(this, socket), TIME_FOR_SCORES);
    }
  }

  emitHostDisconnect(socket) {
    this.emitToRoom(socket, 'hostDisconnect');
  }
}

module.exports = SocketServerInterface;
