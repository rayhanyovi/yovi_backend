const usersService = require("../services/users.service");
const { success } = require("../utils/ApiResponse");

async function listUsers(_req, res, next) {
  try {
    res.json(success(await usersService.listUsers()));
  } catch (error) {
    next(error);
  }
}

module.exports = { listUsers };
