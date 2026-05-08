const authService = require("../services/auth.service");
const { success } = require("../utils/ApiResponse");

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    res.json(success(data));
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const data = await authService.me(req.user.id);
    res.json(success(data));
  } catch (error) {
    next(error);
  }
}

module.exports = { login, me };
