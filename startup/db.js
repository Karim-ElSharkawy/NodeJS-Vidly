const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/VidlyDB', { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true })
        .then(() => winston.info("Connected to VidlyDB..."))

}
