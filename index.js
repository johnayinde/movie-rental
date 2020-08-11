const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config()
require('./startup/logger')()
require('./startup/db')()
require('./startup/validation')()
require('./startup/routes')(app)


app.get('/', (req, res) => {
   res.send("a simple Movie rental API");
})

require('./middleware/error')(app)


app.listen(port, () => console.log(`app started at ${port}`));
