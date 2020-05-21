const mongoose = require('mongoose');
const Joi = require('joi');

function validate(genre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    }

    const result = Joi.validate(genre, schema);
    return result;
}


const Genre = mongoose.model('Genre', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

module.exports.Genre = Genre;
module.exports.validate = validate;