import Joi from '@hapi/joi';

exports.validator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    message: Joi.string().trim().min(10).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }
  next();
};
