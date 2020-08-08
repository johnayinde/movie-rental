const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi); // Validating objectID's

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const error = require('./middleware/error')


require('./startup/routes')(app)
require('./startup/db')()


app.get('/', (req, res) => {
   res.send("a simple Movie rental API");
})

app.use(error);



app.listen(port, () => console.log(`app started at ${port}`));
