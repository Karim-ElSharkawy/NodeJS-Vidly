const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genre');

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    }
});


const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number(),
        genreId: Joi.objectId()
    }

    const result = Joi.validate(movie, schema);
    return result;
}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validate = validateMovie;