// Server config
const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(app);

// Reading file
// fs.readFile('./database/books.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log(err)
//     } else {
//         try {
//             const data = JSON.parse(jsonString)
//             console.log(data.name)
//         } catch (err) {
//             console.log('Error parsing JSON', err)
//         }
//     }
// })

// Writing file
const data = {
    name: 'Newbie Corp',
    order_count: 0,
    adress: 'Po Box City'
},
    jsonString = JSON.stringify(data)

fs.writeFile('./database/test.json', jsonString, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('File succesfully created!')
    }
})


server.listen(process.env.PORT || 3000, () => {
    console.log('Server is listening ...');
});