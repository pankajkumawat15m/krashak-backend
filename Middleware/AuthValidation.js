// This code for server side validation
const joi = require("joi");

// signup validation
const signupValidation = (req, res, next) => {
  // request is come from client in form of object
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

// login validation
const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
