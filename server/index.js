var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.send('Hello From Outer Game Space! \n So nice to meet you!');
});

io.on('connection', function (socket) {

    //Will send back to client a successfull connection made
    socket.emit('status', { connection: 'successful' });


    socket.on('join', function (data) {
        //Data = {username: username}
        console.log(data);
    });
});