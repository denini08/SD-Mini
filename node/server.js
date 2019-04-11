const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var fileupload = require("express-fileupload");
const app = express();

app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());



app.use('/api', require('./src/routes'));

app.listen(3002, () => {
    console.log(`Server started on port ${3002}`);
});

const key = 'SDéTop';
var dgram = require('dgram');
var message = new Buffer(key);
var client = dgram.createSocket("udp4");

client.send(message, 0, message.length, 41234, "230.185.192.108", function(err) {
client.close();
});
