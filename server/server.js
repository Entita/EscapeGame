// Server config
const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);

// Database config
fs.readFile('/database/books.json', 'utf-8', (err, jsonString) => {
    console.log(jsonString)
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...', books);
});