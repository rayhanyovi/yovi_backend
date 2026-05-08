const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersRepository = require("../repositories/users.repository");
const ApiError = require("../utils/ApiError");

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

async function login(email, password) {
  const user = await usersRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, "UNAUTHORIZED", "Invalid email or password");
  }

  const matches = await bcrypt.compare(password, user.password_hash);

  if (!matches) {
    throw new ApiError(401, "UNAUTHORIZED", "Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || "dev-secret-change-me",
    { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
  );

  return {
    token,
    user: publicUser(user),
  };
}

async function me(userId) {
  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new ApiError(401, "UNAUTHORIZED", "Invalid or missing authentication token");
  }

  return publicUser(user);
}

module.exports = {
  login,
  me,
};
