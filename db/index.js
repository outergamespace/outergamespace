const mysql = require('mysql');
const Promise = require('bluebird');

/**
 * A module that provides an interface to the database
 * @module db
 */

const DB_HOST = process.env.OGS_HOST || 'localhost';
const DB_USER = process.env.OGS_USER || 'root';
const DB_PASS = process.env.OGS_PASS || '';
const DB_DATABASE = process.env.OGS_DATABASE || 'trivia';

const databaseQueryString = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DATABASE}?reconnect=true`;

// connection pooling is used here to recycle and prevent dropped connections
const pool = mysql.createPool(databaseQueryString);

const db = {};

// Retrieve n random questions from the database.
// TODO: current query does not support having more than 3 incorrect answers -
// it will always return the 3 answers with the smallest id
/**
 * Retrieves questions from the database
 * @function db.getQuestions
 * @param {number} n - number of questions to retrieve
 * @default 5
 * @return a Promise to use for handling the data retrieval
 */
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
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        connection.release();
      } else {
        connection.query(queryString, (error, results) => {
          if (err) {
            reject(err);
            connection.release();
          } else {
            resolve(results);
            connection.release();
          }
        });
      }
    });
  });
};

db.clearCategories = () =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        connection.release();
      } else {
        connection.query('DELETE FROM trivia_categories', (error) => {
          if (error) {
            reject(error);
            connection.release();
          } else {
            resolve();
            connection.release();
          }
        });
      }
    });
  });

db.updateCategories = categories =>
  db.clearCategories()
    .then(() => {
      const dbInserts = categories.map((category) => {
        const queryString = `
        INSERT INTO trivia_categories (id, name)
        VALUES (${category.id}, '${category.name}')
        `;
        return new Promise((resolve, reject) => {
          pool.getConnection((err, connection) => {
            if (err) {
              reject(err);
              connection.release();
            } else {
              connection.query(queryString, (error) => {
                if (error) {
                  reject(error);
                  connection.release();
                } else {
                  resolve();
                  connection.release();
                }
              });
            }
          });
        });
      });
      return Promise.all(dbInserts);
    })
    .catch(console.error);

db.getCategories = () =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        connection.release();
      } else {
        connection.query('SELECT * FROM trivia_categories', (error, results) => {
          if (error) {
            reject(error);
            connection.release();
          } else {
            resolve(results);
            connection.release();
          }
        });
      }
    });
  });

/** exports a database connection object */
module.exports = db;
