// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Redis
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

client.on('connect', function () {
    console.log('Redis connected!'); // Connected!

    // Add a key
    // client.rpush(['keys', 'test_key'], function (err, reply) {
    //     console.log(reply);
    // });

    // Delete a key
    // client.lrem('keys', 0, 'test_key', function (err, reply) {
    //     console.log('deleted', reply); // 1
    // });

    // Show a list
    // client.lrange('keys', 0, -1, function (err, reply) {
    //     console.log(reply);
    // });

    const random_string = randomString(32),
        expire_time = 10

    console.log(random_string)
    client.set(random_string, 'example@example.com', (err, reply) => {
        console.log(reply)
    })

    client.expire(random_string, expire_time, (err, reply) => {
        console.log(reply)
    })

    client.ttl(randomString, (err, reply) => {
        console.log(reply)
    })

    client.exists(randomString, (err, reply) => {
        console.log(reply)
    })

    setTimeout(() => {
        client.ttl(randomString, (err, reply) => {
            console.log(reply)
        })

        client.exists(randomString, (err, reply) => {
            console.log(reply)
        })
    }, 15000)
});

app.get('/game/:id', (req, res) => {
    const client_key = req.params.id
    client.lpos('keys', client_key, (err, reply) => {
        if (reply != null) {
            res.sendFile('index.html', { root: './public' })
        } else {
            res.send('Key doesn\'t exists')
        }
    })
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