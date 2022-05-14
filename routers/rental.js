const express = require("express");
const router = express.Router();
const { rentalValidation } = require("../validation");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const Movies = require("../models/movies");
const Rentals = require("../models/rental");
const Customer = require("../models/customers");
const rental = require("../models/rental");

Fawn.init(mongoose);

router.get("/", auth, async (req, res) => {
	const rentals = await Rentals.find({}).populate("customer movie");
	if (!rentals || rentals.length < 1)
		return res.status(404).send("No rental available");
	res.status(201).send(rentals);
});

router.post("/", auth, async (req, res) => {
	const { error, value } = rentalValidation(req.body);
	if (error) return res.status(404).send(error.details[0].message);

	const movie = await Movies.findById(req.body.movieId).select({
		genre: 0,
	});
	if (!movie) return res.status(400).send("Invalid Movie");

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send("Invalid Customer");

	if (movie.numberInStock === 0)
		return res.status(400).send("Movie not in stock");
	const rental = await new Rentals({
		movie: movie,
		customer: customer,
	}).save();

	movie.numberInStock--;
	await movie.save();

	res.status(200).send(rental);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const rental = await Rentals.findById(id).populate("customer movie");
	if (!rental) return res.status(500).send("no rental with such ID found");
	res.status(201).send(rental);
});

module.exports = router;
