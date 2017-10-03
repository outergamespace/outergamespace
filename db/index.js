const mysql = require('mysql');
const Promise = require('bluebird');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'trivia',
});

db.connect();

// Retrieve n random questions from the database.
// TODO: current query does not support having more than 3 incorrect answers - 
// it will always return the 3 answers with the smallest id
db.getQuestions = (n = 5) => {
  const queryString = `
    SELECT questions.id, question, correct_ans, category, difficulty,
    I1.ans AS incorrect_ans_1,
    I2.ans AS incorrect_ans_2,
    I3.ans AS incorrect_ans_3
    FROM questions
    JOIN incorrect_answers AS I1 ON questions.id = I1.question_id
    JOIN incorrect_answers AS I2 ON questions.id = I2.question_id
    JOIN incorrect_answers AS I3 ON questions.id = I3.question_id
    WHERE I1.id < I2.id
    AND I2.id < I3.id
    ORDER BY RAND()
    LIMIT ${n}
    `;
  return new Promise((resolve, reject) => {
    db.query(queryString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = db;
