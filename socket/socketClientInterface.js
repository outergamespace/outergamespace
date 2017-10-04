const io = require('socket.io-client');

class SocketClientInterface {
  constructor() {
    this.connection = undefined;
  }

  connect(url) {
    this.connection = io.connect(url);
    // hook up listeners
    this.connection.on('newPlayer', (data) => {
      // TODO: what data format to expect here?
    });
    this.connection.on('validUsername', (data) => {
      // TODO: what data format to expect here?
    });
    this.connection.on('invalidUsername', (data) => {
      // TODO: what data format to expect here?
    });
    this.connection.on('nextQuestion', (data) => {
      // object = { prompt, answers }
    });
    this.connection.on('showRoundScores', (data) => {
      // array of { username, score }
    });
    this.connection.on('showFinalScores', (data) => {
      // array of { username, score }
    });
  }

  registerCallbacks() {
    // TODO: what pattern do we want to use to register the listener callbacks
  }

  /* PRESENTER INTERFACE */
  startGame() {
    this.connection.emit('startGame');
  }

  restartGame() {
    this.connection.emit('restartGame');
  }

  /* PLAYER INTERFACE */
  joinGame(username) {
    this.connection.emit('joinGame', { username });
  }

  submitAnswer(username, answer) {
    this.connection.emit('submitAnswer', { username, answer });
  }
}
