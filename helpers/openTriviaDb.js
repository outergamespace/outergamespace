const request = require('request');
const Promise = require('bluebird');

const OPEN_TRIVIA_DB_URL = 'https://opentdb.com';

const openTriviaDB = {};

openTriviaDB.fetchCategories = () => {
  const url = `${OPEN_TRIVIA_DB_URL}/api_category.php`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err);
      else resolve(JSON.parse(body).trivia_categories);
    });
  })
    .catch(console.error);
};

openTriviaDB.fetchQuestions = (num) => {
  const url = `${OPEN_TRIVIA_DB_URL}/api.php?amount=${num}`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err);
      const questions = JSON.parse(body).results.map((result) => {
        const question = {
          question: result.question,
          category: result.category,
          type: result.type,
          difficulty: result.difficulty,
          correct_ans: result.correct_answer,
        };
        [question.incorrect_ans_1,
          question.incorrect_ans_2,
          question.incorrect_ans_3] = result.incorrect_answers;
        return question;
      });
      resolve(questions);
    });
  })
    .catch(console.error);
};

module.exports = openTriviaDB;
