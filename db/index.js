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

/** exports a database connection object */
module.exports = db;
