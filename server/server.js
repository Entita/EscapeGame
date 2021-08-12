// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);




games = {}
function is_expired(uid) {
    return games[uid]
}
function set_expire(uid, time) {
    games[uid] = true
    setTimeout(function () {
        delete games[uid]
    }, time)
}

app.get('/myroute/:id', function (req, res) {
    /*  This route will get any url that start with /myroute/
        For example /myroute/abc
         /myroute/def
    */
    // req.params.id  ==  what the URL is entered
    console.log(req.params.id)
    if (is_expired(req.params.id)) return res.end('Sorry your link has expired')
    res.send('Great you logged in!')
})
app.post('/login/:uniqueid', function (req, res) {
    set_expire(req.params.uniquieid, 30 * 1000 * 60) //30 minutes = 30*60*1000 miliseconds.
})









io.on('connection', socket => {
    console.log('player connected', socket.id)
    io.emit('connected', socket.id)
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});

