const express = require('express');
const router = express.Router();
const { userAuth } = require('../validation')
const bcrypt = require('bcrypt');
const User = require('../models/user')



router.post('/', async (req, res) => {
   const { error, value } = userAuth(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Invalid email or password!");

      const isValid = await bcrypt.compare(req.body.password, user.password)
      if (!isValid) return res.status(400).send("Invalid email or password!");

      const token = user.generateAuthToken();
      res.status(200).send(token);

   } catch (error) {
      console.error(error);
   }

});

// router.get('/', async (req, res) => {
//    try {
//       const users = await User.find().sort('name');
//       if (!users || users.length < 1) return res.status(404).send("No movie available");
//       res.status(201).send(users);

//    } catch (error) {
//       console.error(error);
//    }
// })


// router.put('/:id', async (req, res) => {
//    const { error, value } = userValidation(req.body)
//    if (error) return res.status(404).send(error.details[0].message);

//    const id = req.params.id;
//    try {
//       const genre = await Genres.findById(req.body.genreId);
//       if (!genre) return res.status(500).send("Invalid ID");

//       const updated = await Movies.findByIdAndUpdate(id, {
//          $set: {
//             title: req.body.title,
//             numberInStock: req.body.numberInStock,
//             dailyRentalRate: req.body.dailyRentalRate,
//             genreId: genre,
//          }
//       }, { new: true })
//       if (!updated) return res.status(500).send("no movie with such ID found");

//       res.status(200).send(updated)
//    } catch (error) {
//       console.error(error);
//    }
// })

// router.get('/:id', async (req, res) => {
//    const id = req.params.id;
//    try {
//       const movie = await Movies.findById(id).populate('genre');
//       if (!movie) return res.status(500).send("no movie with such ID found");
//       res.status(200).send(movie)

//    } catch (error) {
//       console.error('ERROR', error);
//    }
// });


// router.delete('/:id', async (req, res) => {
//    const id = req.params.id;
//    try {
//       const deletedMovie = await Movies.findByIdAndDelete(id);
//       if (!deletedMovie) return res.status(404).send('The movie with the given ID found.');
//       res.status(200).send(deletedMovie)

//    } catch (error) {
//       console.error('ERROR', error);
//    }
// })


module.exports = router;