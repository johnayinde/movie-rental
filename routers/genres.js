const express = require('express');
const router = express.Router();
const { joiValidation } = require('../validation')
const Genres = require('../models/genres');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');
const validateId = require('../middleware/validateId');
const mongoose = require('mongoose');


router.get('/', async (req, res, next) => {
   const allGenres = await Genres.find().sort('name');
   if (!allGenres || allGenres.length < 1) return res.status(404).send("empty genres");
   res.status(201).send(allGenres);
})

router.post('/', [auth, admin], async (req, res) => {
   const { error, value } = joiValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const genre = new Genres({
      name: req.body.name
   })
   if (!genre) return res.status(404).send("no genre to save");

   await genre.save();
   res.status(200).send(genre)
});


router.put('/:id', [auth, admin], async (req, res) => {
   const { error, value } = joiValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   const id = req.params.id;
   const updated = await Genres.findByIdAndUpdate(id, { $set: { name: req.body.name } }, { new: true })
   if (!updated) return res.status(404).send("no genre to update");

   res.status(200).send(updated)

})

router.get('/:id', validateId, async (req, res) => {

   const id = req.params.id;
   const genre = await Genres.findById(id);
   if (!genre) return res.status(404).send("no genre for the ID");
   res.status(200).send(genre)
});


router.delete('/:id', [auth, admin], async (req, res) => {
   const id = req.params.id;
   const deleteGenre = await Genres.findByIdAndDelete(id);
   if (!deleteGenre) return res.status(404).send('The genre with the given ID was not found.');
   res.status(200).send(deleteGenre)
})


module.exports = router;