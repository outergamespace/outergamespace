const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const SocketServerInterface = require('../socket/socketServerInterface.js');

/* SERVER SETUP */

const ioOptions = {
  // transports: ['websocket'],
  forceNew: true,
  reconnection: true,
};
const io = new SocketServerInterface(server, ioOptions);

const CLIENT_DIR = path.join(__dirname, '../client');
const SERVER_PORT = process.env.PORT || 8080;

server.listen(SERVER_PORT);
// we don't specify a port so we will use the default port for the HTTP host
io.listen();
console.log(`Server listening on port ${SERVER_PORT}`);

/* MIDDLEWARE */

app.use(express.static(CLIENT_DIR));
app.use((req, res, next) => {
  console.log(`${req.method} request on ${req.url}`);
  next();
});

/* ROUTE HANDLERS */

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index_presenter.html'));
});

app.get('/join', (req, res) => {
  res.sendFile(path.join(CLIENT_DIR, 'index_player.html'));
});

// Export for testing
module.exports = app;
