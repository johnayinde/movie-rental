const express = require('express');
const router = express.Router();
const middleware = require('../middlewares')
const Genres = require('../models/genres')

// R
router.get('/', async (req, res) => {
   try {
      const allGenres = await Genres.find().sort('name');
      if (!allGenres || allGenres.length < 1) return res.status(404).send("empty genres");
      res.status(201).send(allGenres);

   } catch (error) {
      console.error('ERROR', error);
   }

})
// C
router.post('/', async (req, res) => {
   const { error, value } = middleware.joiValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   try {
      const genre = new Genres({
         name: req.body.name
      })
      if (!genre) return res.status(404).send("no genre to save");

      const newGenre = await genre.save();
      res.status(200).send(newGenre)
   } catch (error) {
      console.error('ERROR', error);

   }

});

// U
router.put('/:id', async (req, res) => {
   const { error, value } = middleware.joiValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const id = req.params.id;
   try {
      const updated = await Genres.findByIdAndUpdate(id, { $set: { name: req.body.name } }, { new: true })
      if (!updated) return res.status(404).send("no genre to update");

      res.status(200).send(updated)
   } catch (error) {
      console.error('ERROR', error);
   }
})

router.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const genre = await Genres.findById(id);
      if (!genre) return res.status(404).send("no genre for the ID");
      res.status(200).send(genre)

   } catch (error) {
      console.error('ERROR', error);
   }
});


router.delete('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const deleteGenre = await Genres.findByIdAndDelete(id);
      if (!deleteGenre) return res.status(404).send('The genre with the given ID was not found.');
      res.status(200).send(deleteGenre)

   } catch (error) {
      console.error('ERROR', error);
   }
})


module.exports = router;