// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')

// Socket.io
const io = require("socket.io")(server);

// Redis
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

// client.on('connect', function () {
//     console.log('Connected!'); // Connected!
// });

// Strings
// client.set('framework', 'ReactJS', function (err, reply) {
//     console.log(reply); // OK
// });

// client.get('framework', function (err, reply) {
//     console.log(reply); // ReactJS
// });


// // Check the existence of a key
// client.exists('framework', function (err, reply) {
//     if (reply === 1) {
//         console.log('Exists!');
//     } else {
//         console.log('Doesn\'t exist!');
//     }
// });

// // Delete a key
// client.del('frameworks_list', function (err, reply) {
//     console.log(reply); // 1
// });










app.get('/game/:id', (req, res, next) => {
    const client_key = req.params.id
        // path = req.params[0] ? req.params[0] : 'index.html'

    if (client_key === 'test') {
        // res.sendFile(path, { root: './public' })
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
    } else {
        res.send('Wrong game id')
    }
    // Now sending only one static file, I want to send static folder with dynamic route ...
})

// Socket.io calls
// io.on('connection', socket => {
//     console.log('player connected', socket.id)
//     io.emit('connected', socket.id)
// })

server.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Server is listening ...')
});

