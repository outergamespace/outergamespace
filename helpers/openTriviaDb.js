const request = require('request');
const Promise = require('bluebird');
const db = require('../db/index.js');

const OPEN_TRIVIA_DB_URL = 'https://opentdb.comx';

const openTriviaDB = {};

openTriviaDB.fetchCategories = () => {
  const url = `${OPEN_TRIVIA_DB_URL}/api_category.php`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err);
      else resolve(JSON.parse(body).trivia_categories);
    });
  })
    .then(categories => db.updateCategories(categories))
    .then(() => db.getCategories())
    // if API request fails, try falling back to what was saved in DB
    .catch(() => db.getCategories());
};

module.exports = openTriviaDB;
