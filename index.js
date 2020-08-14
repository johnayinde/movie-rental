const app = require('./app')
const port = process.env.PORT || 3000;

console.log(process.env.SECRET_KEY)
app.get('/', (req, res) => {
   res.send("a simple Movie rental API");
})

require('./middleware/error')(app)


app.listen(port, () => console.log(`app started at ${port}`));
