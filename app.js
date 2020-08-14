const express = require('express');
const app = express();

require('dotenv').config()
require('./startup/logger')()
require('./startup/db')()
require('./startup/validation')()
require('./startup/routes')(app)

module.exports = app;