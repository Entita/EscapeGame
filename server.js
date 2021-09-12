// Server config
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')


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