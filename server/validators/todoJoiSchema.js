const Joi = require('joi');

const todoJoiSchema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .max(100),
  done: Joi.boolean(),
});

module.exports = todoJoiSchema;
