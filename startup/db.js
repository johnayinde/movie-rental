const mongoose = require('mongoose');


module.exports = function () {
   mongoose.connect(process.env.DB_TEST,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
      .then(() => console.log('DB connected'))
      .catch((error) => console.log("DB error"))
}

// 'mongodb://localhost/vidly'