const Joi = require("@hapi/joi");

exports.validator = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        message: Joi.string().min(10).required()
    }) 
    
    const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json({
          status: 400,
          error: `${result.error.details[0].message}`,
        });
      }
    next();
}
