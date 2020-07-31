const middleware = {}
const Joi = require('@hapi/joi');

middleware.joiValidation = (genre) => {
   const joiSchema = Joi.object().keys({
      name: Joi.string().min(3).required()
   })
   return joiSchema.validate(genre);
}

middleware.customerValidation = (customer) => {
   const joiSchema = Joi.object().keys({
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
   })
   return joiSchema.validate(customer);
}
middleware.movieValidation = (movie) => {
   const joiSchema = Joi.object().keys({
      title: Joi.string().min(2).max(50).required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required(),
      genreId: Joi.string().required(),
   })
   return joiSchema.validate(movie);
}
middleware.rentalValidation = (rental) => {
   const joiSchema = Joi.object().keys({
      movieId: Joi.string().required(),
      customerId: Joi.string().required(),
   })
   return joiSchema.validate(rental);
}
middleware.userValidation = (user) => {
   const joiSchema = Joi.object().keys({
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().max(255).email().required(),
      password: Joi.string().min(5).max(255).required(),
   })
   return joiSchema.validate(user);
}
module.exports = middleware
