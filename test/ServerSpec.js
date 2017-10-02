/* eslint-env mocha */
const expect = require('chai').expect;
var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../server/index.js');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('Should not game instance running on first visit', function testInstance(done) {
    var responseText = '';
    request(server)
      .get('/join')
      .end((err, res) => {
        expect(res.text).to.equal('There is not a current game running');
        done();
    });
  });

  it('Should only have one game instance with multiple players', function testInstance(done) {
    //Create the game
    request(server)
    .get('/join')
    .end((err, res) => {
      request(server)
      .get('/join')
      .end((err, res) => {
          var game = JSON.parse(res.text);
          expect(typeof game).to.equal('object');
          expect(game.players.length).to.equal(2);
          expect(game.players[0].username).to.equal('newPlayer0');
          expect(game.players[0].score).to.equal(0);
          done();
      })

      
    });

  });


});