const middleware = {}
const Joi = require('@hapi/joi');

middleware.joiValidation = (genre) => {
   const joiSchema = Joi.object().keys({
      name: Joi.string().min(3).required()
   })
   return joiSchema.validate(genre);

}
module.exports = middleware