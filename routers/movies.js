const express = require('express');
const router = express.Router();
const { movieValidation } = require('../validation')
const Movies = require('../models/movies')
const Genres = require('../models/genres')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


router.get('/', async (req, res) => {
   try {
      const movies = await Movies.find().sort('name');
      if (!movies || movies.length < 1) return res.status(404).send("No movie available");
      res.status(201).send(movies);

   } catch (error) {
      console.error(error);
   }
})

router.post('/', auth, async (req, res) => {
   const { error, value } = movieValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   try {
      const genreId = await Genres.findById(req.body.genreId);
      if (!genreId) return res.status(500).send("Invalid ID");

      const movie = new Movies({
         title: req.body.title,
         numberInStock: req.body.numberInStock,
         dailyRentalRate: req.body.dailyRentalRate,
         genre: genreId,
      })
      if (!movie) return res.status(404).send("no movie with such ID found");
      await movie.save();

      res.status(200).send(movie);

   } catch (error) {
      console.error('ERROR', error);
   }

});

router.put('/:id', auth, async (req, res) => {
   const { error, value } = movieValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const id = req.params.id;
   try {
      const genre = await Genres.findById(req.body.genreId);
      if (!genre) return res.status(500).send("Invalid ID");

      const updated = await Movies.findByIdAndUpdate(id, {
         $set: {
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genreId: genre,
         }
      }, { new: true })
      if (!updated) return res.status(500).send("no movie with such ID found");

      res.status(200).send(updated)
   } catch (error) {
      console.error(error);
   }
})

router.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const movie = await Movies.findById(id).populate('genre');
      if (!movie) return res.status(500).send("no movie with such ID found");
      res.status(200).send(movie)

   } catch (error) {
      console.error('ERROR', error);
   }
});


router.delete('/:id', auth, async (req, res) => {
   const id = req.params.id;
   try {
      const deletedMovie = await Movies.findByIdAndDelete(id);
      if (!deletedMovie) return res.status(404).send('The movie with the given ID found.');
      res.status(200).send(deletedMovie)

   } catch (error) {
      console.error('ERROR', error);
   }
})


module.exports = router;