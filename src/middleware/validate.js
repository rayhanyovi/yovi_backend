const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

function validate(req, _res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const details = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  return next(new ApiError(422, "VALIDATION_ERROR", "Validation failed", details));
}

module.exports = validate;
