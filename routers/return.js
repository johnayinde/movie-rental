const express = require("express");
const router = express.Router();
const { validateReturn } = require("../validation");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const Movies = require("../models/movies");
const Rentals = require("../models/rental");
const Customer = require("../models/customers");
const moment = require("moment");
const logger = require("../startup/logger");

router.post("/", auth, async (req, res) => {
	const { error, value } = validateReturn(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const rental = await Rentals.findOne({
		customer: req.body.customerId,
		movie: req.body.movieId,
	}).populate("customer movie");
	console.log(" rental", rental);
	if (!rental) return res.status(404).send("rental not found");

	if (rental.dateReturned)
		return res.status(400).send("rental already processed ");

	rental.dateReturned = new Date();
	const rentalDays = moment().diff(rental.dateOut, "days");

	rental.movie.dailyRentalRate = 2;

	rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
	await rental.save();

	await Movies.updateOne(
		{ _id: rental.movie._id },
		{ $inc: { numberInStock: 1 } }
	);

	if (rental) return res.status(200).send(rental);
});

module.exports = router;
