/* eslint-env mocha */
const expect = require('chai').expect;
const request = require('supertest');

describe('Server', () => {
  let server;
  beforeEach(() => {
    server = require('../server/index.js');
  });
  afterEach(() => {
    server.close();
  });

  describe('Should create a new server instance with one game instance', () => {
    it('responds to /', (done) => {
      request(server)
        .get('/')
        .expect(200, done);
    });

    it('404 everything else', (done) => {
      request(server)
        .get('/foo/bar')
        .expect(404, done);
    });
  });
});
