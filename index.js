const express = require('express');
const app = express();
const genres = require('./routers/genres');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
   .then(() => console.log('DB connected'))
   .catch((error) => console.log("DB error", error))



app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('api/genres', genres)

app.get('/', (req, res) => {
   res.send("welcome to my web page");
})




app.listen(port, () => console.log(`app started at ${port}`));
