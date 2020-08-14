const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
   },
   email: {
      type: String,
      unique: true,
      maxlength: 255,
      required: true
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024

   },
   isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'secret');
   return token;
}

const user = mongoose.model('User', userSchema);


module.exports = user;
