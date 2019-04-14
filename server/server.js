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



mongoose.connect("mongodb://localhost:27017/servidor", { useNewUrlParser: true });

requireDir('./src/models');
const api = require('./src/routes');

app.use('/api', new api().routes);

app.listen(3001, () => {
    console.log('Server started on: ' + ip.address()+ ' port: 3001');
});