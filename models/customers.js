const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      max: 255,
   },
   isGold: {
      type: Boolean,
      default: false
   },
   phone: Number
});

const Customers = mongoose.model('Customer', customerSchema);

// const genre = new Genres({
//    name: "action"
// })
// genre.save().then(() => console.log('genre saved'));



module.exports = Customers;
