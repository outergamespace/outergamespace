import io from 'socket.io-client';

// const SOCKET_HOST = process.env.OGS_HOST || 'localhost';
// const SOCKET_PORT = process.env.PORT || 3000;
//
// const SOCKET_URL = `${SOCKET_HOST}:${SOCKET_PORT}`;

// we will use the default connection params of the host connection
const connection = io();

export default connection;
