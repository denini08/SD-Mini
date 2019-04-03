const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

mongoose.connect("mongodb://localhost:27017/servidor", { useNewUrlParser: true });

requireDir('./src/models');
const api = require('./src/routes');

app.use('/api', api);

app.listen(3001, () => {
    console.log(`Server started on port ${3001}`);
});