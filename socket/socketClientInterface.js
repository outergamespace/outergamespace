import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';
const connection = io.connect(SOCKET_URL);

export default connection;
