const express = require('express');
const router = express.Router();
const { userValidation } = require('../validation')
const bcrypt = require('bcrypt');
const User = require('../models/user');
const _ = require('lodash')
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
   const { error, value } = userValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(400).send("User already registered!");

   user = new User(_.pick(req.body, ['name', 'email', 'password']))

   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
   await user.save();

   const token = user.generateAuthToken();
   console.log(token);
   res.header('x-auth-token', token).status(200).send(_.pick(user, ['name', 'email']));


});
router.get('/me', auth, async (req, res) => {
   const user = await User.findById(req.user._id).select('-password');
   res.status(201).send(user);
})


// router.put('/:id', async (req, res) => {
//    const { error, value } = userValidation(req.body)
//    if (error) return res.status(404).send(error.details[0].message);

//    const id = req.params.id;
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
//   
// })

// router.get('/:id', async (req, res) => {
//    const id = req.params.id;
//       const movie = await Movies.findById(id).populate('genre');
//       if (!movie) return res.status(500).send("no movie with such ID found");
//       res.status(200).send(movie)

//   
// });


// router.delete('/:id', async (req, res) => {
//    const id = req.params.id;
//       const deletedMovie = await Movies.findByIdAndDelete(id);
//       if (!deletedMovie) return res.status(404).send('The movie with the given ID found.');
//       res.status(200).send(deletedMovie)

//    
// })


module.exports = router;