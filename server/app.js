// Server config
const express = require('express');
const app = express();
const server = require('http').createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});