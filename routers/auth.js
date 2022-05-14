const express = require("express");
const router = express.Router();
const { userAuth } = require("../validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/", async (req, res) => {
	const { error, value } = userAuth(req.body);
	if (error) return res.status(404).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email or password!");

	const isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return res.status(400).send("Invalid email or password!");

	const token = user.generateAuthToken();
	res.status(200).send(token);
});

module.exports = router;
