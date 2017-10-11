/* eslint-env mocha */
const expect = require('chai').expect;
const db = require('../db/index.js');

// The database test related to question retrieval have been commented out since
// questions are being pulled from the Open Trivia DB API
describe('Database', () => {
  xdescribe('Retrieve questions from database', () => {
    it('Should retrieve n questions when n is less than the number of items in the database', (done) => {
      db.getQuestions(3)
        .then((results) => {
          expect(results.length).to.equal(3);
        })
        .finally(() => {
          done();
        });
    });

    it('Should retrieve 5 questions when n is not provided', (done) => {
      db.getQuestions()
        .then((results) => {
          expect(results.length).to.equal(5);
        })
        .finally(() => {
          done();
        });
    });

    it('Should return a question object', (done) => {
      db.getQuestions()
        .then((results) => {
          const question = results[0];
          expect(question).to.have.property('question');
          expect(question).to.have.property('correct_ans');
          expect(question).to.have.property('category');
          expect(question).to.have.property('difficulty');
          expect(question).to.have.property('incorrect_ans_1');
          expect(question).to.have.property('incorrect_ans_2');
          expect(question).to.have.property('incorrect_ans_3');
        })
        .finally(() => {
          done();
        });
    });

    // NOTE: this test has a 1/120 (5!) chance of failing if there are 5 questions in the db
    it('Should return random questions every time', (done) => {
      let results1;
      let results2;
      db.getQuestions()
        .then((results) => {
          results1 = results;
        })
        .then(() => db.getQuestions())
        .then((results) => {
          results2 = results;
        })
        .then(() => {
          expect(results1).to.not.eql(results2);
        })
        .finally(() => {
          done();
        });
    });
  });
});
