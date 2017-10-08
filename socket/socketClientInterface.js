import io from 'socket.io-client';

const ioOptions = {
  transports: ['websocket'],
  // forceNew: true,
  reconnection: true,
};

// we will use the default connection params of the host connection
// if we want to have the ability to specify the port, we can add it to the interface as well
const connection = io(ioOptions);

export default connection;
