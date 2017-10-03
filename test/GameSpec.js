/* eslint-env mocha */
const expect = require('chai').expect;
const {Game} = require('../game/game.js');
const {gameInstance} = require('../game/game.js');
const {Player} = require('../game/player.js');

describe('Game', () => {
    var newGame = new Game();
    console.log( "newGame => ", newGame);
    console.log(newGame.players);
    describe('Should create a singleton game instacnce', () => {
        it('Game instance should not be null after instantiation', () => {
            expect(newGame).to.not.equal(null);
        });

        it('Game instance should have zero players', () => {
            expect(newGame.players.length).to.equal(0);
        });

        it('Game instance should be able to add players', () => {
            newGame.addPlayer( new Player("player1"));
            newGame.addPlayer( new Player("player2"));
            newGame.addPlayer( new Player("player3"));
            expect(newGame.players.length).to.equal(3);
          });

          it('Game instance should return null if the game has been ended', () => {
            newGame.endGame();
            expect(gameInstance).to.equal(null);
          });

    });
  });
  