// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Database config
var books = []

fetch('database/books.json')
    .then(response => response.json())
    .then(json => books = json)

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...', books);
});