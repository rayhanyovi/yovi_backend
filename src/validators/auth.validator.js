const { body } = require("express-validator");

const loginRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
];

module.exports = { loginRules };
