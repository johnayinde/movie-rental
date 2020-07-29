const express = require('express');
const router = express.Router();
const middleware = require('../middlewares')

const genres = [
   { id: '1', genre: 'action' },
   { id: '2', genre: 'travel' },
   { id: '3', genre: 'comedy' },
   { id: '4', genre: 'adventure' },
];
// home

// R
router.get('/genres', (req, res) => {
   if (!genres) return res.status(404).send("empty genres");
   res.status(200).send(genres);
})
// C
router.post('/', (req, res) => {
   const { error, value } = middleware.joiValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const newGenre = {
      id: genres.length + 1,
      genre: req.body.genre
   }
   genres.push(newGenre);
   res.status(200).send(genres)
});

// U
router.put('/:id', (req, res) => {
   const genre = genres.find((id) => id.id === parseInt(req.params.id));
   console.log(genre);

   if (!genre) return res.status(404).send("no genre for the ID");
   const { error, value } = middleware.joiValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   genre.genre = req.body.genre;
   res.send(genre);
})

router.get('/:id', (req, res) => {
   const genre = genres.find((id) => id.id === parseInt(req.params.id))
   if (!genre) return res.status(404).send("no genre for the ID");
   res.send(genre);
});


router.delete('/:id', (req, res) => {
   const genre = genres.find((id) => id.id === parseInt(req.params.id))
   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
   const index = genres.indexOf(genre)
   genres.splice(index, 1);
   res.send(genres);
})


module.exports = router;