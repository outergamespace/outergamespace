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

db.storeUser = (name, hash) => {
  const queryString = `
    INSERT INTO users
    (name, hash, total_points, games_played, badge)
    VALUES
    ('${name}', '${hash}', 0, 0, 'member')
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

db.getUser = (name) => {
  const queryString = `
    SELECT * FROM users
    WHERE name='${name}'
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

db.getAllUsers = () => {
  const queryString = `
    SELECT * FROM users
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
}
  
db.addGame = (game) => {
  const { roomId, username, noOfQuestions, timePerQuestion, maxPlayers } = game;
  const queryString = `
    INSERT INTO games
    (room_id, host_username, num_questions, time_per_question, max_players, num_players, isStarted)
    VALUES
    ('${roomId}', '${username}', ${noOfQuestions}, ${timePerQuestion}, ${maxPlayers}, 0, 0)
 `;
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        connection.release();
      } else {
        resolve(connection);
      }
    });
  })
    .then((connection) => {
      connection.query(queryString, (error, results) => {
        if (error) {
          connection.release();
          throw error;
        } else {
          connection.release();
          return results;
        }
      });
    })
    .catch(console.error);
};

/** exports a database connection object */
module.exports = db;
