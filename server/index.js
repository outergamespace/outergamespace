const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('../socket/socketServerInterface.js');

/* SERVER SETUP */

const CLIENT_DIR = path.join(__dirname, '../client');
const SERVER_PORT = 8080;

server.listen(SERVER_PORT);
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
module.exports = server;
