const express = require('express');
const app = express();
const genreRouter = require('./routes/genres');
const homeRouter = require('./routes/home');

app.use('/api/genres', genreRouter);
app.use('/', homeRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Ready to connect on port ${port}`));