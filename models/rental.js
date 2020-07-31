const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
   dateOut: {
      type: Date,
      required: true,
      default: Date.now
   },
   dateReturned: {
      type: Date,
   },
   rentalFee: {
      type: Number,
      min: 0,
   },
   customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
   },
   movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie'
   }
});

const rental = mongoose.model('Rental', rentalSchema);



module.exports = rental;
