const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
// how many rounds of salt https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
const db = require('../db');

const app = express();
const server = require('http').Server(app);
const SocketServerInterface = require('../socket/socketServerInterface.js');

/* SERVER SETUP */

const io = new SocketServerInterface(server);

const CLIENT_DIR = path.join(__dirname, '../client');
const IMAGE_DIR = path.join(__dirname, '../images');
const SERVER_PORT = process.env.PORT || 8080;

server.listen(SERVER_PORT);
// we don't specify a port so we will use the default port for the HTTP host
io.listen();
console.log(`Server listening on port ${SERVER_PORT}`);

/* MIDDLEWARE */

app.use(express.static(CLIENT_DIR));
app.use(express.static(IMAGE_DIR));
app.use(bodyParser.json());
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

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.getUser(username)
    .then(results => results[0].hash)
    .then((hash) => {
      return bcrypt.compare(password, hash)
    })
    .then((isValidPass) => {
      res.send({ isValidPass });
    })
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds)
    .then(hash => db.storeUser(username, hash))
    .then((result) => {
      if (!result) { res.status(403).send('That user already exists'); }
      res.send(result);
    })
    .catch(err => console.error(err));
});

// Export for testing
module.exports = app;
