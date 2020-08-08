const genres = require('../routers/genres');
const customers = require('../routers/customers');
const movies = require('../routers/movies');
const rental = require('../routers/rental');
const users = require('../routers/users');
const auth = require('../routers/auth');
const express = require('express');



module.exports = function routes(app) {

   app.use(express.json());
   app.use(express.urlencoded({ extended: false }))
   app.use('/api/genres', genres);
   app.use('/api/customers', customers);
   app.use('/api/movies', movies);
   app.use('/api/rental', rental);
   app.use('/api/users', users);
   app.use('/api/auth', auth);
}