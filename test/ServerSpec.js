/* eslint-env mocha */
const expect = require('chai').expect;
const request = require('supertest');

describe('Server', () => {
  let server;
  beforeEach(() => {
    server = require('../server/index.js');
  });
  afterEach(() => {
    server.close();
  });

  describe('Should create a new server instance with one game instance', () => {
    it('responds to /', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

    it('404 everything else', (done) => {
      request(server)
        .get('/foo/bar')
        .expect(404, done);
    });

    it('Should not game instance running on first visit', (done) => {
      const responseText = '';
      request(server)
        .get('/join')
        .end((err, res) => {
          expect(res.text).to.equal('There is not a current game running');
          done();
        });
    });

    it('Should only have one game instance with multiple players', (done) => {
      // Create the game
      request(server)
        .get('/join')
        .end((err, res) => {
          request(server)
            .get('/join')
            .end((err, res) => {
              const game = JSON.parse(res.text);
              console.log('Game instacne returned  => ', game);
              expect(typeof game).to.equal('object');
              expect(game.players.length).to.equal(2);
              expect(game.players[0].username).to.equal('newPlayer0');
              expect(game.players[0].score).to.equal(0);
              done();
            });
        });
    });
  });
});
