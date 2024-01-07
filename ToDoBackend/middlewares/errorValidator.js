const { celebrate, Joi } = require("celebrate");
const { ObjectId } = require("mongoose").Types;
const validUrl = require("validator/lib/isURL");

const validateId = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const validLink = (value, helpers) => {
  if (validUrl(value)) {
    return value;
  }
  return helpers.error("any.invalid");
};

const validTitle = (value, helpers) => {
  if (!/[а-яА-Яa-zA-Z0-9-._~:/?#@!$&'()*+,;=]+?$/.test(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};
const validState = (value, helpers) => {
  if (
    value !== "done" ||
    value !== "in_process" ||
    value !== "paused" ||
    value !== "not_started" ||
    value !== "stopped"
  ) {
    return helpers.error("any.invalid");
  }
  return value;
};

const validateTask = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(40).custom(validTitle),
    description: Joi.string().max(1000).required(),
    lastChangeDate: Joi.date().iso().required(),
    state: Joi.string().required().custom(validTitle).custom(validState),
    taskLink: Joi.string().required().custom(validLink),
  }),
});

module.exports = {
  validateId,
  validateTask,
};
