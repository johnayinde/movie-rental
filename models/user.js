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
   const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, "secret");
   return token;
}

const user = mongoose.model('User', userSchema);

// async function run() {

//    user = new User({
//       name: "sample",
//       email: "sample1@gmail.com",
//       password: "12345",
//       isAdmin: true
//    })
//    try {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(user.password, salt);
//       await user.save();
//       console.log("user saved");
//    } catch (error) {
//       console.log(error);

//    }
// }

// run()

module.exports = user;
