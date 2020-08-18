import Joi from '@hapi/joi';

exports.commentValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    comment: Joi.string().min(4).required(),
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
