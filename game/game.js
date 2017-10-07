const _ = require('underscore');
const db = require('../db/index.js');
const Player = require('./player.js');

const POINTS_PER_QS = 10;
const MAX_PLAYERS = 4;

const scrambleAnswers = question => (
  _.shuffle([
    question.correct_ans,
    question.incorrect_ans_1,
    question.incorrect_ans_2,
    question.incorrect_ans_3,
  ])
);

/**
 * A module that can create and provides an interface to a Game object
 * @module game
 */

/** Class representing a Game class */
class Game {
  /** Create a game instance */
  constructor() {
    this.players = {};
    db.getQuestions()
      .then((results) => {
        this.questions = results;
      });
    this.currentQuestionIndex = -1;
    this.answeredCount = 0;
  }

  /**
   * Restart the game
   */
  restart() {
    this.players = {};
    db.getQuestions()
      .then((results) => {
        this.questions = results;
      });
    this.currentQuestionIndex = -1;
    this.answeredCount = 0;
  }

  /**
   * Checks to see if game has no players
   * @return {boolean} if game has no players
   */
  hasNoPlayers() {
    return Object.keys(this.players).length === 0;
  }

  /**
   * Checks to see if game is full
   * @return {boolean} if game is full
   */
  isFull() {
    return Object.keys(this.players).length >= MAX_PLAYERS;
  }

  /**
   * Checks to see if game has started
   * @return {boolean} if game has started
   */
  hasStarted() {
    return this.currentQuestionIndex !== -1;
  }

  /**
   * Checks to see if currently at the last question
   * @return {boolean} if currently at the last question
   */
  atLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  /**
   * Checks to see if username is already taken
   * @param {string} username - the username to check for
   * @return {boolean} if the username is already taken
   */
  hasPlayer(username) {
    const allUsernames = _.values(this.players).map(player => player.username);
    return allUsernames.includes(username);
  }

  /**
   * Adds a player to the game
   * @param {string} socketId - the socket id of the player to be added to the current game
   * @param {string} username - the username of the player to be added to the current game
   */
  addPlayer(socketId, username) {
    this.players[socketId] = new Player(username);
  }

  /**
   * Removes a player from the game
   * @param {string} socketId - the socketId of the player to be removed from the current game
   */
  removePlayer(socketId) {
    delete this.players[socketId];
  }

  /**
   * Retrieves the current question
   * @return {Object} representing a question
   */
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  /**
   * Retrieves the next question to be used in the game
   * @return {Object} containing a 'prompt' and a set of 'answers'
   */
  nextQuestion() {
    this.currentQuestionIndex += 1;
    this.answeredCount = 0;
    const question = this.getCurrentQuestion();
    if (question) {
      const prompt = question.question;
      const answers = scrambleAnswers(question);
      return { prompt, answers };
    }
    return undefined;
  }

  /**
   * Retrieves the correct answer of the current question
   * @return {string} answer - the correct answer
   */
  getAnswer() {
    return this.getCurrentQuestion().correct_ans;
  }

  /**
   * Receives an answer from a given user, increments the submit counter, and
   * calculates the user's score
   * @param {string} username - the username of the player
   * @param {string} answer - the given answer of the user
   */
  receiveAnswer(socketId, answer) {
    this.answeredCount += 1;
    if (this.getAnswer() === answer) {
      this.players[socketId].addToScore(POINTS_PER_QS);
    }
  }

  /**
   * Checks to see if all players have submitted their answers
   * @return {boolean} if all players have submitted their answers
   */
  allAnswered() {
    return this.answeredCount === Object.keys(this.players).length;
  }

  /**
   * Gets the the player Objects and sorts them in descending order
   * @return {Array} all player Objects sorted in descending order
   */
  getScores() {
    return _.sortBy(_.values(this.players), 'score').reverse();
  }
}

/** exports Game class */
module.exports = Game;
