const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const SocketServerInterface = require('../socket/socketServerInterface.js');

/* SERVER SETUP */

const io = new SocketServerInterface(server);

const CLIENT_DIR = path.join(__dirname, '../client');
const SERVER_PORT = 8080;
const SOCKET_PORT = 3000;

server.listen(SERVER_PORT);
io.listen(SOCKET_PORT);
console.log(`Server listening on port ${SERVER_PORT}`);
console.log(`Socket listening on port ${SOCKET_PORT}`);

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
module.exports = server;
