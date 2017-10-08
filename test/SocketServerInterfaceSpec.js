/* eslint-env mocha */
const express = require('express');
const expect = require('chai').expect;
const sinon = require('sinon');
const io = require('socket.io-client');
const Game = require('../game/game.js');
const SocketServerInterface = require('../socket/socketServerInterface.js');

const app = express();
// const app = require('../server/index.js');

const PORT = 4568;
const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
};

describe('SocketServerInterface', () => {
  let server;
  let ioServer;
  let ioHost;
  let ioClient;

  beforeEach(() => {
    server = app.listen(PORT);
    ioServer = new SocketServerInterface(server, ioOptions);
    ioServer.listen();
    ioHost = io('http://localhost:4568/', ioOptions);
    ioClient = io('http://localhost:4568/', ioOptions);
  });

  afterEach(() => {
    ioServer.io.close();
    ioHost.close();
    ioClient.close();
    server.close();
  });

  describe('handleCreateRoom', () => {
    let handleCreateRoomSpy;
    let listenForHostEventsSpy;
    let triviaCreateRoomSpy;
    let callbackSpy;

    beforeEach((done) => {
      handleCreateRoomSpy = sinon.spy(ioServer, 'handleCreateRoom');
      listenForHostEventsSpy = sinon.spy(ioServer, 'listenForHostEvents');
      triviaCreateRoomSpy = sinon.spy(ioServer.trivia, 'createRoom');
      callbackSpy = sinon.spy(done);

      ioHost.emit('createRoom', callbackSpy);
    });

    it('Should be called on createRoom event', () => {
      expect(handleCreateRoomSpy.callCount).to.equal(1);
    });

    it('Should be called with the emitting socket as its first argument', () => {
      const firstArg = handleCreateRoomSpy.args[0][0];
      expect(firstArg.id).to.equal(ioHost.id);
    });

    it('Should call the callback with null as the first argument and a roomId as the second', () => {
      const firstArg = callbackSpy.args[0][0];
      const secondArg = callbackSpy.args[0][1];
      expect(firstArg).to.equal(null);
      expect(secondArg).to.be.a('string');
      expect(secondArg).to.have.a.lengthOf(4);
    });

    it('Should call listenForHostEvents with the emitting socket as the first argument', () => {
      expect(listenForHostEventsSpy.callCount).to.equal(1);
      const firstArg = listenForHostEventsSpy.args[0][0];
      expect(firstArg.id).to.equal(ioHost.id);
    });

    it('Should call createRoom on its trivia instance with the emitting socket\'s id as the first argument', () => {
      expect(triviaCreateRoomSpy.callCount).to.equal(1);
      const firstArg = triviaCreateRoomSpy.args[0][0];
      expect(firstArg).to.equal(ioHost.id);
    });
  });

  describe('handleJoinRoom', () => {
    it('Should handle joinRoom events', (done) => {
      ioHost.emit('createRoom', (err1, roomId) => {
        ioClient.emit('joinRoom', roomId, 'alan', (err2) => {
          const game = ioServer.getGame(roomId);
          expect(game.hasPlayer('alan')).to.equal(true);
          expect(err2).to.equal(undefined);
          done();
        });
      });
    });
  });
});
