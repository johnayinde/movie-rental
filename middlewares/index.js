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
middleware.movieValidation = (customer) => {
   const joiSchema = Joi.object().keys({
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean()
   })
   return joiSchema.validate(customer);

}
module.exports = middleware