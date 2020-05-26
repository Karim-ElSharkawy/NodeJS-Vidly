const express = require('express');
const genreRouter = require('../routes/genres');
const homeRouter = require('../routes/home');
const customerRouter = require('../routes/customers');
const movieRouter = require('../routes/movies');
const rentalRouter = require('../routes/rentals');
const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/rentals', rentalRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/genres', genreRouter);
    app.use('/', homeRouter);

    app.use(error);
}