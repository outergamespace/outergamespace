/* eslint-env mocha */
const expect = require('chai').expect;
const Trivia = require('../game/trivia.js');
const Game = require('../game/game.js');

describe('Trivia', () => {
  let trivia;

  beforeEach(() => {
    trivia = new Trivia();
  });

  describe('Should create a trivia instance', () => {
    it('Should have an empty game object', () => {
      expect(trivia.games).to.deep.equal({});
    })
  });

  describe('Should create new rooms', () => {
    it('Should create a new room with a game instance', () => {
      const roomId = trivia.createRoom();
      expect(trivia.games[roomId]).to.be.an.instanceof(Game);
      expect(Object.keys(trivia.games)).to.have.lengthOf(1);
    });

    it('Should create rooms with unique room codes at every call', () => {
      for (let i = 0; i < 2000; i += 1) {
        let roomId = trivia.createRoom();
        expect(trivia.games[roomId]).to.be.an.instanceof(Game);
        expect(Object.keys(trivia.games)).to.have.lengthOf(i + 1);
      }
    })
  });

  describe('Should allow users to join a room', () => {
    it('Should add players to a game', () => {
      const roomId = trivia.createRoom();
      const game = trivia.getGame(roomId);

      trivia.joinGame('1', roomId, 'alan');
      expect(game.players['1'].username).to.equal('alan');
      expect(Object.keys(game.players)).to.have.lengthOf(1);

      trivia.joinGame('2', roomId, 'belle');
      expect(game.players['2'].username).to.equal('belle');
      expect(Object.keys(game.players)).to.have.lengthOf(2);
    });

    it('Should throw error when given an empty username', () => {
      const roomId = trivia.createRoom();

      const joinWithEmptyUsername = () => trivia.joinGame('1', roomId, '');
      expect(joinWithEmptyUsername).to.throw(/provide.*username/);
    });
    
    it('Should throw error if room does not exists', () => {
      const roomId = trivia.createRoom();
      trivia.endGame(roomId);

      const joinNonExistentRoom = () => trivia.joinGame('1', roomId, 'alan');
      expect(joinNonExistentRoom).to.throw(/not.*exist/);
    });
  });
});
