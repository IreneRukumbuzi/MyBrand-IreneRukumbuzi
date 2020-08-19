import Joi from '@hapi/joi';

exports.commentValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    comment: Joi.string().trim().min(1).required(),
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
