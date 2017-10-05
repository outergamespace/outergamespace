/* eslint-env mocha */
const expect = require('chai').expect;
const gameInstance = require('../game/game.js');
const Player = require('../game/player.js');

describe('Game', () => {
  describe('Should create a singleton game instance', () => {
    it('Game instance should not be null after instantiation', () => {
      expect(gameInstance).to.not.equal(null);
    });

    it('Game instance should have zero players', () => {
      expect(Object.keys(gameInstance.players).length).to.equal(0);
    });

    it('Game instance should be able to add players', () => {
      gameInstance.addPlayer(new Player('player1'));
      gameInstance.addPlayer(new Player('player2'));
      gameInstance.addPlayer(new Player('player3'));
      expect(Object.keys(gameInstance.players).length).to.equal(3);
    });
  });
});
