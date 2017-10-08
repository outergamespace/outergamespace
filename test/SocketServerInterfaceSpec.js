/* eslint-env mocha */
const express = require('express');
const expect = require('chai').expect;
const sinon = require('sinon');
const io = require('socket.io-client');
const SocketServerInterface = require('../socket/socketServerInterface.js');

const app = express();

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
    let handlerSpy;
    let listenForHostEventsSpy;
    let triviaCreateRoomSpy;
    let callbackSpy;

    beforeEach((done) => {
      handlerSpy = sinon.spy(ioServer, 'handleCreateRoom');
      listenForHostEventsSpy = sinon.spy(ioServer, 'listenForHostEvents');
      triviaCreateRoomSpy = sinon.spy(ioServer.trivia, 'createRoom');
      callbackSpy = sinon.spy(done);

      ioHost.emit('createRoom', callbackSpy);
    });

    it('Should be called on createRoom event', () => {
      expect(handlerSpy.callCount).to.equal(1);
    });

    it('Should be called with the emitting socket as argument', () => {
      const firstArg = handlerSpy.args[0][0];
      expect(firstArg.id).to.equal(ioHost.id);
    });

    it('Should call the callback with null and roomId as arguments', () => {
      const firstArg = callbackSpy.args[0][0];
      const secondArg = callbackSpy.args[0][1];
      expect(firstArg).to.equal(null);
      expect(secondArg).to.be.a('string');
      expect(secondArg).to.have.a.lengthOf(4);
    });

    it('Should call listenForHostEvents with the emitting socket as argument', () => {
      expect(listenForHostEventsSpy.callCount).to.equal(1);
      const firstArg = listenForHostEventsSpy.args[0][0];
      expect(firstArg.id).to.equal(ioHost.id);
    });

    it('Should call createRoom on its trivia instance with the socketId as argument', () => {
      expect(triviaCreateRoomSpy.callCount).to.equal(1);
      const firstArg = triviaCreateRoomSpy.args[0][0];
      expect(firstArg).to.equal(ioHost.id);
    });
  });

  describe('handleJoinRoom', () => {
    let handlerSpy;
    let listenForPlayerEventsSpy;
    let emitUpdatePlayersSpy;
    let triviaJoinGameSpy;
    let callbackSpy;
    let unsuccessfulCallbackSpy;

    let lastRoomId;

    beforeEach((done) => {
      handlerSpy = sinon.spy(ioServer, 'handleJoinRoom');
      listenForPlayerEventsSpy = sinon.spy(ioServer, 'listenForPlayerEvents');
      emitUpdatePlayersSpy = sinon.spy(ioServer, 'emitUpdatePlayers');
      triviaJoinGameSpy = sinon.spy(ioServer.trivia, 'joinGame');
      callbackSpy = sinon.spy();
      unsuccessfulCallbackSpy = sinon.spy(() => done());

      ioHost.emit('createRoom', (err, roomId) => {
        lastRoomId = roomId;
        ioClient.emit('joinRoom', roomId, 'belle', callbackSpy);
        ioClient.emit('joinRoom', roomId, 'belle', unsuccessfulCallbackSpy);
      });
    });

    it('Should be called on joinRoom events', () => {
      expect(handlerSpy.callCount).to.equal(2);
    });

    it('Should be called with the emitting socket as argument', () => {
      const firstArg = handlerSpy.args[0][0];
      expect(firstArg.id).to.equal(ioClient.id);
    });

    it('Should call the callback with null as the first argument on successful join', () => {
      const firstArg = callbackSpy.args[0][0];
      expect(firstArg).to.equal(null);
    });

    it('Should call the callback with and error message as the first argument on unsuccessful join', () => {
      const firstArg = unsuccessfulCallbackSpy.args[0][0];
      expect(firstArg).to.be.a('string');
      expect(firstArg).to.not.equal('');
    });

    it('Should call listenForPlayerEvents with the emitting socket as argument', () => {
      expect(listenForPlayerEventsSpy.callCount).to.equal(1);
      const firstArg = listenForPlayerEventsSpy.args[0][0];
      expect(firstArg.id).to.equal(ioClient.id);
    });

    it('Should call emitUpdatePlayers with the roomId as argument', () => {
      expect(emitUpdatePlayersSpy.callCount).to.equal(1);
      const firstArg = emitUpdatePlayersSpy.args[0][0];
      expect(firstArg).to.equal(lastRoomId);
    });

    it('Should call joinGame on its trivia instance with the socketId, roomId and username as arguments', () => {
      expect(triviaJoinGameSpy.callCount).to.equal(2);
      const firstArg = triviaJoinGameSpy.args[0][0];
      expect(firstArg).to.equal(ioClient.id);
      const secondArg = triviaJoinGameSpy.args[0][1];
      expect(secondArg).to.equal(lastRoomId);
      const thirdArg = triviaJoinGameSpy.args[0][2];
      expect(thirdArg).to.equal('belle');
    });
  });
});
