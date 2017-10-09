const Game = require('./game.js');

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Return a random room code made up of uppercase alphabets
 * @param {number} [n=4] - length of the room code
 * @return {string} random room code
 */
const getRandRoomId = (n = 4) => {
  let roomId = '';
  for (let i = 0; i < n; i += 1) {
    roomId += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  }
  return roomId;
};

/**
 * A module that can create and provides an interface to a Trivia object.
 * @module trivia
 */

/** Class representing a Trivia */
class Trivia {
  /** Creates a Trivia instance */
  constructor() {
    // maps roomId to game instance
    this.games = {};
  }

  /**
   * Creates a new room with a unique room code and store it in the instance
   * @return {string} room code
   */
  createRoom() {
    let roomId = getRandRoomId();
    while (this.games[roomId]) {
      // if taken, generate another roomId
      roomId = getRandRoomId();
    }
    this.games[roomId] = new Game();
    return roomId;
  }

  /**
   * Adds a new player to a game
   * @param {string} socketId - socket id of incoming player
   * @param {string} roomId - id of the room the player wants to join
   * @param {string} username - username the player wants to use
   * @throws if roomId is invalid
   */
  joinGame(socketId, roomId, username) {
    const game = this.games[roomId];
    if (game) {
      game.addPlayer(socketId, username);
    } else {
      throw new Error('Room does not exist');
    }
  }

  /**
   * Returns the game instance corresponding to a room code
   * @param {string} roomId - id of the room
   * @return {Object} the game instance
   */
  getGame(roomId) {
    return this.games[roomId];
  }

  /**
   * Remove the game from the instance
   * @param {string} roomId - id of the room
   */
  endGame(roomId) {
    delete this.games[roomId];
  }
}

module.exports = Trivia;
