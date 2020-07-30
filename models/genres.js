const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      max: 50,
   }
})

const Genres = mongoose.model('Genre', genreSchema);


module.exports = Genres;
