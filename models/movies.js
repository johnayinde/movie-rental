const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
   title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
   },
   numberInStock: {
      type: Number,
      min: 0,
      max: 255,
      required: true
   },
   dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
      required: true
   },
   genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre'
   }
});

const movies = mongoose.model('Movie', movieSchema);



module.exports = movies;
