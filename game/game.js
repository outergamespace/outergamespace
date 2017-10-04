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

class Game {
  constructor() {
    this.players = {};
    db.getQuestions()
      .then((results) => {
        this.questions = results;
      });
    this.currentQuestion = 0;
    this.answeredCount = 0;
  }

  restart() {
    this.players = {};
    this.questions = db.getQuestions();
    this.currentQuestion = 0;
    this.answeredCount = 0;
  }

  hasPlayer(player) {
    return Object.prototype.hasOwnProperty.call(this.players, player.username);
  }

  addPlayer(player) {
    if (this.hasPlayer(player)) {
      throw new Error('Username already taken');
    } else {
      this.players[player.username] = player;
    }
  }

  nextQuestion() {
    this.answeredCount = 0;
    const question = this.questions[this.currentQuestion];
    const prompt = question.question;
    const answers = scrambleAnswers(question);
    return { prompt, answers };
  }

  checkAnswer(answer) {
    const correctAns = this.questions[this.currentQuestion].correct_ans;
    return correctAns === answer;
  }

  receiveAnswer(username, answer) {
    this.answeredCount += 1;
    if (this.checkAnswer(answer)) {
      this.players[username].addToScore(POINTS_PER_QS);
    }
  }

  allAnswered() {
    return this.answeredCount === Object.keys(this.players).length;
  }

  getScores() {
    return _.sortBy(_.values(this.players), 'score');
  }
}

module.exports = new Game();
module.exports.Game = Game;
