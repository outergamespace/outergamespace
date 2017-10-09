const io = require('socket.io-client');

/* CLASS DEFINITION */
class SocketClientInterface {
  constructor(options) {
    // not sure if this is necessary, it depends if io() will work when it's
    // passed an empty or undefined object
    if (options) {
      this.connection = io(options);
    } else {
      // we will use the default connection params of the host connection
      // if we want to have the ability to specify the port, we can add it to the interface as well
      this.connection = io();
    }
    this.callbacks = {
      host: {},
      player: {},
    };
  }

  /* EVENT LISTENERS */

  listenForHostEvents() {
    this.connection.on('updatePlayers', this.handleHostUpdatePlayers.bind(this));
    this.connection.on('nextQuestion', this.handleHostNextQuestion.bind(this));
    this.connection.on('showRoundScores', this.handleHostShowRoundScores.bind(this));
    this.connection.on('showFinalScores', this.handleHostShowFinalScores.bind(this));
    this.connection.on('showAnswer', this.handleHostShowAnswer.bind(this));
  }

  listenForPlayerEvents() {
    this.connection.on('nextQuestion', this.handlePlayerNextQuestion.bind(this));
    this.connection.on('showAnswer', this.handlePlayerShowAnswer.bind(this));
    this.connection.on('showRoundScores', this.handlePlayerShowRoundScores.bind(this));
    this.connection.on('showFinalScores', this.handlePlayerShowFinalScores.bind(this));
    this.connection.on('hostDisconnect', this.handlePlayerHostDisconnect.bind(this));
  }

  removeListenersForHostEvents() {
    this.connection.removeAllListeners('updatePlayers');
    this.connection.removeAllListeners('nextQuestion');
    this.connection.removeAllListeners('showRoundScores');
    this.connection.removeAllListeners('showFinalScores');
  }

  removeListenersForPlayerEvents() {
    this.connection.removeAllListeners('nextQuestion');
    this.connection.removeAllListeners('showAnswer');
    this.connection.removeAllListeners('showRoundScores');
    this.connection.removeAllListeners('showFinalScores');
    this.connection.removeAllListeners('hostDisconnect');
  }

  /* EVENT HANDLERS - HOST */

  handleHostUpdatePlayers(players) {
    // TODO: Add some error handling if there was no callback defined
    this.callbacks.host.updatePlayers(players);
  }
  handleHostNextQuestion(question, players) {
    this.callbacks.host.nextQuestion(question, players);
  }
  handleHostShowRoundScores(players) {
    this.callbacks.host.showRoundScores(players);
  }
  handleHostShowFinalScores(players) {
    this.callbacks.host.showFinalScores(players);
  }
  handleHostShowAnswer(answer) {
    this.callbacks.host.showAnswer(answer);
  }

  /* EVENT HANDLERS - PLAYER */

  handlePlayerNextQuestion(question) {
    this.callbacks.player.nextQuestion(question);
  }
  handlePlayerShowAnswer(answer) {
    this.callbacks.player.showAnswer(answer);
  }
  handlePlayerShowRoundScores() {
    // null for now since there's no data to send back
    this.callbacks.player.showRoundScores(null);
  }
  handlePlayerShowFinalScores() {
    // null for now since there's no data to send back
    this.callbacks.player.showFinalScores(null);
  }
  handlePlayerHostDisconnect() {
    // null for now since there's no data to send back
    this.callbacks.player.hostDisconnect(null, null);
  }

  /* EVENT CALLBACK REGISTRY - HOST */

  registerCallbackHostUpdatePlayers(callback) {
    this.callbacks.host.updatePlayers = callback;
  }
  registerCallbackHostNextQuestion(callback) {
    this.callbacks.host.nextQuestion = callback;
  }
  registerCallbackHostShowRoundScores(callback) {
    this.callbacks.host.showRoundScores = callback;
  }
  registerCallbackHostShowFinalScores(callback) {
    this.callbacks.host.showFinalScores = callback;
  }
  registerCallbackHostShowAnswer(callback) {
    this.callbacks.host.showAnswer = callback;
  }

  /* EVENT CALLBACK REGISTRY - PLAYER */

  registerCallbackPlayerNextQuestion(callback) {
    this.callbacks.player.nextQuestion = callback;
  }
  registerCallbackPlayerShowAnswer(callback) {
    this.callbacks.player.showAnswer = callback;
  }
  registerCallbackPlayerShowRoundScores(callback) {
    this.callbacks.player.showRoundScores = callback;
  }
  registerCallbackPlayerShowFinalScores(callback) {
    this.callbacks.player.showFinalScores = callback;
  }
  registerCallbackPlayerHostDisconnect(callback) {
    this.callbacks.player.hostDisconnect = callback;
  }
}

module.exports = SocketClientInterface;
