// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

// Redis
const client = redis.createClient(6379)

app.get('/game/:id', function (req, res) {
    const client_key = req.params.id,
        mail = 'entitak@gmail.com'
    client.setex(mail, 3600, client_key)
    res.send('Great you logged in!', mail, client_key)
})

io.on('connection', socket => {
    console.log('player connected', socket.id)
    io.emit('connected', socket.id)
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});

