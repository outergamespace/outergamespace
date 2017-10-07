// import io from 'socket.io-client';
//
// const SOCKET_URL = 'http://localhost:3000';
// const connection = io.connect(SOCKET_URL);
//
// export default connection;

import io from 'socket.io-client';

const SOCKET_HOST = process.env.OGS_HOST || 'localhost';
// const SOCKET_PORT = process.env.OGS_SOCKET_PORT || 3000;
// const SOCKET_HOST = 'us-cdbr-iron-east-05.cleardb.net';
const SOCKET_PORT = process.env.PORT || 3000;

const SOCKET_URL = `${SOCKET_HOST}:${SOCKET_PORT}`;

console.log('*** SOCKET_URL:', SOCKET_URL);

// const connection = io.connect(SOCKET_URL);

// we will use the default connection params of the host
const connection = io();

export default connection;
