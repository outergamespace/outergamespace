/* eslint-env mocha */
const expect = require('chai').expect;
const Player = require('../game/player.js');

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player('alan');
  });

  describe('Should create a new player', () => {
    it('New player should have the correct name', () => {
      expect(player.username).to.equal('alan');
    });

    it('New player should have a score of zero', () => {
      expect(player.score).to.equal(0);
    });

    it('New player should have an answered state of false', () => {
      expect(player.answered).to.equal(false);
    });
  });

  describe('Should increment the score of a player', () => {
    it('Should increment the score of a player', () => {
      player.addToScore(10);
      expect(player.score).to.equal(10);
      player.addToScore(10);
      player.addToScore(10);
      expect(player.score).to.equal(30);
    });
  });

  describe('Should set the answered state of a player', () => {
    it('Should set the answered state', () => {
      player.setAnswered(true);
      expect(player.answered).to.equal(true);
      player.setAnswered(false);
      expect(player.answered).to.equal(false);
      player.setAnswered(true);
      expect(player.answered).to.equal(true);
    });
  });
});
