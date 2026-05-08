const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

function authMiddleware(req, _res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "UNAUTHORIZED", "Invalid or missing authentication token"));
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret-change-me");
    req.user = { id: decoded.userId, email: decoded.email };
    return next();
  } catch (_error) {
    return next(new ApiError(401, "UNAUTHORIZED", "Invalid or missing authentication token"));
  }
}

module.exports = authMiddleware;
