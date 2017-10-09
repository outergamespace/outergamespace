// import io from 'socket.io-client';
const io = require('socket.io-client');

// we will use the default connection params of the host connection
// if we want to have the ability to specify the port, we can add it to the interface as well
// const connection = io();

/* CLASS DEFINITION */
class SocketClientInterface {
  constructor(options) {
    // not sure if this is necessary, it depends if io() will work when it's
    // passed an empty or undefined object
    if (options) {
      this.connection = io(options);
    } else {
      this.connection = io();
    }
    this.callbacks = {
    };
  }

  /* EVENT LISTENERS */
  // io.removeAllListeners('updatePlayers');
  // io.removeAllListeners('nextQuestion');
  // io.removeAllListeners('showRoundScores');
  // io.removeAllListeners('showFinalScores');
  // io.on('updatePlayers', this.updatePlayers);
  // io.on('nextQuestion', this.nextQuestion);
  // io.on('showRoundScores', this.showRoundScores);
  // io.on('showFinalScores', this.showFinalScores);

  // TODO: Do we need the socket?
  // listenForHostEvents(socket) {
  //   socket.on('updatePlayers', this.handleUpdatePlayers.bind(this, socket));
  //   socket.on('nextQuestion', this.handleNextQuestion.bind(this, socket));
  //   socket.on('showRoundScores', this.handleShowRoundScores.bind(this, socket));
  //   socket.on('showFinalScores', this.handleShowFinalScores.bind(this, socket));
  // }

  listenForHostEvents() {
    this.connection.on('updatePlayers', this.handleUpdatePlayers.bind(this));
    this.connection.on('nextQuestion', this.handleNextQuestion.bind(this));
    this.connection.on('showRoundScores', this.handleShowRoundScores.bind(this));
    this.connection.on('showFinalScores', this.handleShowFinalScores.bind(this));
  }

  removeListenersForHostEvents() {
    this.connection.removeAllListeners('updatePlayers');
    this.connection.removeAllListeners('nextQuestion');
    this.connection.removeAllListeners('showRoundScores');
    this.connection.removeAllListeners('showFinalScores');
  }

  /* EVENT HANDLERS - HOST */
  handleUpdatePlayers(players) {
    // TODO: Add some error handling if there was no callback defined
    this.callbacks.updatePlayers(null, players);
  }

  handleNextQuestion(question, players) {
    this.callbacks.nextQuestion(null, question, players);
  }

  handleShowRoundScores(players) {
    this.callbacks.showRoundScores(null, players);
  }

  handleShowFinalScores(players) {
    this.callbacks.showFinalScores(null, players);
  }

  /* EVENT CALLBACK REGISTRY */
  registerCallbackUpdatePlayers(callback) {
    this.callbacks.updatePlayers = callback;
  }
  registerCallbackNextQuestion(callback) {
    this.callbacks.nextQuestion = callback;
  }
  registerCallbackShowRoundScores(callback) {
    this.callbacks.showRoundScores = callback;
  }
  registerCallbackShowFinalScores(callback) {
    this.callbacks.showFinalScores = callback;
  }
}

module.exports = SocketClientInterface;
// module.exports.connection = connection;
// export default connection;
