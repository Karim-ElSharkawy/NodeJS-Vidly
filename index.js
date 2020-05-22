const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genreRouter = require('./routes/genres');
const homeRouter = require('./routes/home');
const customerRouter = require('./routes/customers');
const movieRouter = require('./routes/movies');
const rentalRouter = require('./routes/rentals');

mongoose.connect('mongodb://localhost/VidlyDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to VidlyDB..."))
    .catch(err => console.log('Failed to Connect to VidlyDB...'));

app.use('/api/rentals', rentalRouter);
app.use('/api/movies', movieRouter);
app.use('/api/customers', customerRouter);
app.use('/api/genres', genreRouter);
app.use('/', homeRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Ready to connect on port ${port}`));


