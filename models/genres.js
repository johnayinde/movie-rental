const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
   name: String,
})

const Genres = mongoose.model('Genre', genreSchema);

module.exports = Genres;
