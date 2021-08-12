// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);




app.get('/game/:id', function (req, res) {
    const client_key = req.params.id
    console.log(req)
    console.log('BLA')
    console.log(res)
    res.send('Great you logged in!')
})









io.on('connection', socket => {
    console.log('player connected', socket.id)
    io.emit('connected', socket.id)
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});

