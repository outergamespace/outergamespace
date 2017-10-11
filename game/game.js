const _ = require('underscore');
const Player = require('./player.js');
const openTriviaDB = require('../helpers/openTriviaDb.js');

const POINTS_PER_QS = 10;

/* SETTINGS AND CONFIGURATIONS */

const CONFIG = {
  noOfQuestions: { name: 'No. of questions', min: 1, max: 30, default: 10 },
  timePerQuestion: { name: 'Time per question', min: 1, max: 30, default: 15 },
  maxPlayers: { name: 'Maximum no. of players', min: 1, max: 10, default: 6 },
};

const DEFAULT_CONFIG = {};
Object.keys(CONFIG).forEach((k) => {
  DEFAULT_CONFIG[k] = CONFIG[k].default;
});

const USERNAME_MAX_LENGTH = 10;

const checkConfigRange = (config = DEFAULT_CONFIG) => {
  Object.keys(config).forEach((key) => {
    if (CONFIG[key]) {
      const val = config[key];
      const { name, min, max } = CONFIG[key];
      if (val < min || val > max) {
        throw new Error(`${name} must be between ${min} and ${max}`);
      }
    }
  });
};

/**
 * Shuffle the answers of a given question
 * @param {Object} representing the question
 * @return {Array} 4 answers in random order
 */
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
  constructor(config) {
    this.players = {};
    this.currentQuestionIndex = -1;
    this.answeredPlayers = [];

    checkConfigRange(config);
    this.config = Object.assign({}, DEFAULT_CONFIG, config);

    openTriviaDB.fetchQuestions(this.config.noOfQuestions)
      .then((results) => {
        this.questions = results;
      })
      .catch(console.error);
  }

  /**
   * Get the time allowed for each question
   * @return {number} number of seconds allowed for each question
   */
  getTimePerQuestion() {
    return this.config.timePerQuestion;
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
    return Object.keys(this.players).length >= this.config.maxPlayers;
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
   * @throws if username is too short or too long
   * @throws if username is already taken in the game
   * @throws if the room is already full
   * @throws if the game has already started
   */
  addPlayer(socketId, username) {
    if (username.length === 0) {
      throw new Error('Please provide a username');
    } else if (username.length > USERNAME_MAX_LENGTH) {
      throw new Error(`Username cannot have more than ${USERNAME_MAX_LENGTH} characters`);
    } else if (this.hasPlayer(username)) {
      throw new Error('Username already taken');
    } else if (this.isFull()) {
      throw new Error('The room is full');
    } else if (this.hasStarted()) {
      throw new Error('The game has already started');
    }

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
   * Gets the the player Objects and sorts them by their usernames
   * @return {Array} all player Objects sorted in alphabetical order of their usernames
   */
  getPlayers() {
    return _.sortBy(_.values(this.players), 'username');
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
    // set answered state of all players to false
    _.values(this.players).forEach(player => player.setAnswered(false));

    this.currentQuestionIndex += 1;
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
    const player = this.players[socketId];
    player.setAnswered(true);
    if (this.getAnswer() === answer) {
      player.addToScore(POINTS_PER_QS);
    }
  }

  /**
   * Checks to see if all players have submitted their answers
   * @return {boolean} if all players have submitted their answers
   */
  allAnswered() {
    return _.values(this.players).every(player => player.answered);
  }
}

/** exports Game class */
module.exports = Game;
