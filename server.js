// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Redis
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

// Functions
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

    // const random_string = randomString(64),
    //     expire_time = 60

    // console.log(random_string)
    client.set('test', 'example@example.com', (err, reply) => {
        console.log(reply)
    })

    // client.expire(random_string, expire_time, (err, reply) => {
    //     console.log(reply)
    // })
});

app.get('/game/:id', (req, res) => {
    const client_key = req.params.id
    client.exists(client_key, (err, reply) => {
        if (reply === 1) {
            res.sendFile('index.html', { root: './public' })
        } else {
            res.send('Key doesn\'t exists')
        }
    })
})

app.get('*', (req, res) => {
    // Get all paths
    const get_path = req.params[0]
    var get_file = get_path.split('/public/')[1]

    if (get_path.startsWith('/public/') && get_file != 'index.html') {
        // Availability to get any files from /public folder on call
        res.sendFile(get_file, { root: './public' })
    } else if (get_path.startsWith('/default/')) {
        // Availability to get any files from /default folder on call
        get_file = get_path.split('/default/')[1]
        res.sendFile(get_file, { root: './default' })
    } else {
        // If not calling public or default folder, then respond with default file
        res.sendFile('index.html', { root: './default' })
    }
})

server.listen(process.env.PORT || 3000, (req, res) => {
    console.log('Server is listening ...')
});