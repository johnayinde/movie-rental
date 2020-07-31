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
   phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50

   }
});

const Customers = mongoose.model('Customer', customerSchema);


module.exports = Customers;
