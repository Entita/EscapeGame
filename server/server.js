// Server config
const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);

// Database config
fs.readFile('/database/books.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err)
    } else {
        try {
            const data = JSON.parse(jsonString)
            console.log(data)
        } catch (err) {
            console.log('Error parsing JSON', err)
        }
    }
})

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});