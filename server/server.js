// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);


io.on('connection', socket => {
    console.log('player connected', socket.id)
    io.emit('connected', socket.id)
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});

