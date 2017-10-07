/* eslint-env mocha */
const expect = require('chai').expect;
const Game = require('../game/game.js');
const Player = require('../game/player.js');

const gameInstance = new Game();

describe('Game', () => {
  describe('Should create a singleton game instance', () => {
    it('Game instance should not be null after instantiation', () => {
      expect(gameInstance).to.not.equal(null);
    });

    it('Game instance should have zero players', () => {
      expect(Object.keys(gameInstance.players).length).to.equal(0);
    });

    it('Game instance should be able to add players', () => {
      gameInstance.addPlayer('1', 'player1');
      gameInstance.addPlayer('2', 'player2');
      gameInstance.addPlayer('3', 'player3');
      expect(Object.keys(gameInstance.players).length).to.equal(3);
    });
  });
});
