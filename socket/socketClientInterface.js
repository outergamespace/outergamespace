import io from 'socket.io-client';

// we will use the default connection params of the host connection
// if we want to have the ability to specify the port, we can add it to the interface as well
const connection = io();

export default connection;
