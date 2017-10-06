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
    // maps host's socket id to room id
    this.hostToRoom = {};
    // maps player's socket id to room id
    this.playerToRoom = {};
    // maps room to game instance
    this.roomToGame = {};
  }

  createRoom(socketId) {
    let roomId = getRandRoomId();
    while (this.roomToGame[roomId]) {
      // if taken, get another roomId
      roomId = getRandRoomId();
    }
    this.hostToRoom[socketId] = roomId;
    this.roomToGame[roomId] = new Game();
    return roomId;
  }

  joinGame(socketId, roomId) {
    this.playerToRoom[socketId] = roomId;
  }

  removePlayer(socketId) {
    delete this.playerToRoom[socketId];
  }

  isHost(socketId) {
    return this.hostToRoom[socketId] !== undefined;
  }

  isPlayer(socketId) {
    return this.playerToRoom[socketId] !== undefined;
  }

  getRoomBySocketId(socketId) {
    let room = this.hostToRoom[socketId];
    if (room === undefined) {
      room = this.playerToRoom[socketId];
    }
    return room;
  }

  getGameByRoomId(roomId) {
    return this.roomToGame[roomId];
  }

  getGameBySocketId(socketId) {
    return this.getGameByRoomId(this.getRoomBySocketId(socketId));
  }
}

module.exports = new Trivia();
