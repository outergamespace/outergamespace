const request = require('request');
const Promise = require('bluebird');
const db = require('../db/index.js');

const OPEN_TRIVIA_DB_URL = 'https://opentdb.com';

const openTriviaDB = {};

openTriviaDB.fetchCategories = () => {
  const url = `${OPEN_TRIVIA_DB_URL}/api_category.php`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err);
      const categories = JSON.parse(body).trivia_categories;
      db.saveCategories(categories)
        .catch(console.error);
      resolve(categories);
    });
  });
};

module.exports = openTriviaDB;
