const Game = require('./game.js');

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getRandRoomId = (n = 4) => {
  let roomId = '';
  for (let i = 0; i < n; i += 1) {
    roomId += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  }
  return roomId;
};

class Trivia {
  constructor() {
    // maps roomId to game instance
    this.games = {};
  }

  createRoom() {
    let roomId = getRandRoomId();
    while (this.games[roomId]) {
      // if taken, generate another roomId
      roomId = getRandRoomId();
    }
    this.games[roomId] = new Game();
    return roomId;
  }

  joinGame(socketId, roomId, username) {
    const game = this.games[roomId];
    if (game) {
      if (game.hasPlayer(username)) {
        throw new Error('Username already taken');
      } else if (game.isFull()) {
        throw new Error('The room is full');
      } else if (game.hasStarted()) {
        throw new Error('The game has already started');
      }
    } else {
      throw new Error('Room does not exist');
    }

    game.addPlayer(socketId, username);
  }

  getGame(roomId) {
    return this.games[roomId];
  }

  endGame(roomId) {
    delete this.games[roomId];
  }
}

module.exports = Trivia;
