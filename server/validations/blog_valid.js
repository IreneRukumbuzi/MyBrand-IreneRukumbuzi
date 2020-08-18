import Joi from '@hapi/joi';

exports.blogValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    content: Joi.string().min(30).required(),
    imageUrl: Joi.string().required(),
    date: Joi.date().iso(),
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
