const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const genres = require('./routers/genres');
const customers = require('./routers/customers');
const movies = require('./routers/movies');
const rental = require('./routers/rental');
const user = require('./routers/users');

mongoose.connect('mongodb://localhost/vidly',
   { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('DB connected'))
   .catch((error) => console.log("DB error", error))



app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rental', rental)
app.use('/api/users', user)

app.get('/', (req, res) => {
   res.send("welcome to my web page");
})

app.get((req, res) => {
   res.send("Page Not Found");
})



app.listen(port, () => console.log(`app started at ${port}`));
