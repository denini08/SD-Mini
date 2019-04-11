const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var logger = require('morgan');
const ip = require('ip')
var fileupload = require("express-fileupload");

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.set('views', path.join(__dirname , 'src','views'));
app.set('view engine', 'ejs');


//UDP
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const key = 'SDéTop';
let filhos = [];
server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`mensagem:  ${msg} de ${rinfo.address}:${rinfo.port}`);
  if(msg === key){
    filhos.push(rinfo.address);
  }
});

server.on('listening', () => {
  const address = server.address();
  server.addMembership('230.185.192.108')
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);
// Prints: server listening 0.0.0.0:41234


mongoose.connect("mongodb://localhost:27017/servidor", { useNewUrlParser: true });

requireDir('./src/models');
const api = require('./src/routes');

app.use('/api', api);

app.listen(3001, () => {
    console.log('Server started on: ' + ip.address()+ ' port: 3001');
});