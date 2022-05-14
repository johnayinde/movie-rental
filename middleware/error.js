const winston = require("winston");

module.exports = function (app) {
	app.use((req, res, next) => {
		const error = new Error("Not Found");
		error.status = 404;
		next(error);
	});
	app.use((error, req, res, next) => {
		winston.error(error.message, error);
		res.status(error.status || 500);

		res.json({
			error: {
				status: error.messtatussage || 500,
				message: "Internal Server Error" || error.message,
			},
		});
	});
};
