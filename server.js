// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Redis
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', function () {
    console.log('Connected!'); // Connected!

    // Strings
    // client.rpush(['keys', 'test_key2'], function (err, reply) {
    //     console.log(reply);
    // });

    client.lrange('keys', 0, -1, function (err, reply) {
        console.log(reply);
    });

    // Delete a key
    // client.del('frameworks_list', function (err, reply) {
    //     console.log(reply); // 1
    // });

});

function key_exists(key) {
    client.exists(key, function (err, reply) {
        console.log('response', reply)
        if (reply === 1) {
            return true
        }
        return false
    });
}

app.get('/game/:id', (req, res) => {
    const client_key = req.params.id

    if (key_exists(client_key)) {
        res.sendFile('index.html', { root: './public' })
    } else {
        res.send('Key doesn\'t exists')
    }
})

app.get('*', (req, res) => {
    // Get all paths
    const get_path = req.params[0]

    if (get_path.startsWith('/public/')) {
        // Availability to get any files from /public folder on call
        const get_last_path = get_path.split('/public/')[1]
        res.sendFile(get_last_path, { root: './public' })
    } else if (get_path.startsWith('/default/')) {
        // Availability to get any files from /default folder on call
        const get_last_path = get_path.split('/default/')[1]
        res.sendFile(get_last_path, { root: './default' })
    } else {
        // If not calling public or default folder, then respond with default file
        res.sendFile('index.html', { root: './default' })
    }
})

server.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Server is listening ...')
});