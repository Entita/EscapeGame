// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);

// Redis
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', function () {
    console.log('Connected!'); // Connected!
});

// Strings

client.set('framework', 'ReactJS', function (err, reply) {
    console.log(reply); // OK
});

client.get('framework', function (err, reply) {
    console.log(reply); // ReactJS
});

// Hashes

client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

client.hgetall('frameworks_hash', function (err, object) {
    console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});

// Lists

client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function (err, reply) {
    console.log(reply); // 2
});

client.lrange('frameworks_list', 0, -1, function (err, reply) {
    console.log(reply); // [ 'ReactJS', 'Angular' ]
});

// Sets

client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function (err, reply) {
    console.log(reply); // 4
});

client.smembers('frameworks_set', function (err, reply) {
    console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
});

// Check the existence of a key

client.exists('framework', function (err, reply) {
    if (reply === 1) {
        console.log('Exists!');
    } else {
        console.log('Doesn\'t exist!');
    }
});

// Delete a key

client.del('frameworks_list', function (err, reply) {
    console.log(reply); // 1
});

// Increment a key

client.set('working_days', 5, function () {
    client.incr('working_days', function (err, reply) {
        console.log(reply); // 6
    });
});










app.get('/game/:id', function (req, res) {
    const client_key = req.params.id
    res.send('Great you logged in!' + client_key)
})

io.on('connection', socket => {
    console.log('player connected', socket.id)
    io.emit('connected', socket.id)
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});

