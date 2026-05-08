const ApiError = require("../utils/ApiError");

function errorHandler(err, _req, res, _next) {
  const error = err instanceof ApiError ? err : new ApiError(
    err.statusCode || 500,
    err.code || "INTERNAL_SERVER_ERROR",
    err.message || "Something went wrong"
  );

  if (error.statusCode >= 500) {
    console.error(err);
  }

  res.status(error.statusCode).json({
    success: false,
    error: {
      code: error.code,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    },
  });
}

module.exports = errorHandler;
