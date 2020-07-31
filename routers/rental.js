const express = require('express');
const router = express.Router();
const { rentalValidation } = require('../middlewares');

const Movies = require('../models/movies');
const Rentals = require('../models/rental');
const Customer = require('../models/customers')

router.get('/', async (req, res) => {
   try {
      const rentals = await Rentals.find().sort('dateOut');
      if (!rentals || rentals.length < 1) return res.status(404).send("No rental available");
      res.status(201).send(movies);

   } catch (error) {
      console.error(error);
   }
})

router.post('/', async (req, res) => {
   const { error, value } = rentalValidation(req.body)
   if (error) return res.status(404).send(error.details[0].message);

   try {
      const movie = await Movies.findById(req.body.movieId);
      if (!movie) return res.status(500).send("Invalid Movie");

      const customer = await Customer.findById(req.body.customerId);
      if (!customer) return res.status(500).send("Invalid Customer");

      if (movie.numberInStock === 0) return res.status(400).send("Movie not in stock")
      const rental = new Rentals({
         movie: movie,
         customer: customer,
      })
      await rental.save();
      movie.numberInStock--;
      movie.save();

      res.status(200).send(rental);

   } catch (error) {
      console.error( error);
   }

});

router.get('/:id', async (req, res) => {
   const id = req.params.id;
   try {
      const rental = await Rentals.findById(id);
      if (!rental) return res.status(500).send("no rental with such ID found");
      res.status(201).send(rental)

   } catch (error) {
      console.error(error);
   }
});

// router.put('/:id', async (req, res) => {
//    const { error, value } = rentalValidation(req.body)
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