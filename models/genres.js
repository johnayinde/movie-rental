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

// const genre = new Genres({
//    name: "action"
// })
// genre.save().then(() => console.log('genre saved'));



module.exports = Genres;
