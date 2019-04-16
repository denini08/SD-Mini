const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    google: {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

mongoose.model('User', userSchema);