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
    console.log(`Servidor filho start, porta: ${3002}`);
});

const msg = 'SDéTop PORTA:3002';
var dgram = require('dgram');
var message = new Buffer(msg);
var client = dgram.createSocket("udp4");

client.send(message, 0, message.length, 41234, "230.185.192.108", function(err) {
client.close();
});
