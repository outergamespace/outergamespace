/* eslint-env mocha */
const expect = require('chai').expect;
const Player = require('../game/player.js');

describe('Player', () => {
  describe('Should create Player with username and score of zero', () => {
    const newPlayer = new Player('1', 'testPlayer');
    it('new player should have the correct name', () => {
      expect(newPlayer.username).to.equal('testPlayer');
    });

    it('new player should have a score of zero', () => {
      expect(newPlayer.score).to.equal(0);
    });

    it('new player should have ability to add to their score', () => {
      newPlayer.addToScore(100);
      expect(newPlayer.score).to.equal(100);
    });
  });
});
