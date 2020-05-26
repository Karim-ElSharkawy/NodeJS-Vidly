const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.port || 3000;
app.listen(port, () => winston.info(`Ready to connect on port ${port}`));