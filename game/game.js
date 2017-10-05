const _ = require('underscore');
const db = require('../db/index.js');

const POINTS_PER_QS = 10;

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
    this.questions = db.getQuestions();
    this.currentQuestionIndex = 0;
    this.answeredCount = 0;
  }

  /**
   * Checks to see if player is already in the game
   * @param {Object} player - the player object to check for
   * @return {boolean} if the player is already in the game
   */
  hasPlayer(player) {
    return Object.prototype.hasOwnProperty.call(this.players, player.username);
  }

  /**
   * Adds a player to the game
   * @param {Object} player - the player object to add to the current game
   * @throws {Error} Will throw an error if the given username has already been taken
   */
  addPlayer(player) {
    if (this.hasPlayer(player)) {
      throw new Error('Username already taken');
    } else {
      this.players[player.username] = player;
    }
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
   * Checks an answer from the player to verify if it matches the correct answer
   * for the current question prompt
   * @param {string} answer - the answer string selected by the player
   * @return {boolean} if the given answer matches the correct answer
   */
  checkAnswer(answer) {
    return this.getCurrentQuestion().correct_ans === answer;
  }

  /**
   * Receives an answer from a given user, increments the submit counter, and
   * calculates the user's score
   * @param {string} username - the username of the player
   * @param {string} answer - the given answer of the user
   */
  receiveAnswer(username, answer) {
    this.answeredCount += 1;
    if (this.checkAnswer(answer)) {
      this.players[username].addToScore(POINTS_PER_QS);
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
    return _.sortBy(_.values(this.players), 'score');
  }
}

/** exports a new Game object */
module.exports = new Game();
