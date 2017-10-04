import io from 'socket.io-client';

const SOCKET_URL = 'http://10.6.70.110:3000';

export default io.connect(SOCKET_URL);

