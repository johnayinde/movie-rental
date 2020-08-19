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


// let customerId = mongoose.Types.ObjectId();
// let movieId = mongoose.Types.ObjectId();
// let genreId = mongoose.Types.ObjectId();

// (async () => {

//    const rentals = new rental({
//       customer: {
//          _id: customerId,
//          name: '12345',
//          phone: '123456'
//       },
//       movie: {
//          _id: movieId,
//          title: '12345',
//          dailyRentalRate: 2,
//          movieInStock: 10,

//       }
//    })
//    await rentals.populate('movie').save((e, p) => { console.log("saved"); })
// })()


module.exports = rental;
