const mongoose = require('mongoose');


module.exports = function () {
   mongoose.connect('mongodb://localhost/vidly',
      { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('DB connected'))
      .catch((error) => console.log("DB error"))
}
