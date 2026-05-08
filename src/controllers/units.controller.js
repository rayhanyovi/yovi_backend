const unitsService = require("../services/units.service");
const { success } = require("../utils/ApiResponse");

async function listUnits(_req, res, next) {
  try {
    res.json(success(await unitsService.listUnits()));
  } catch (error) {
    next(error);
  }
}

module.exports = { listUnits };
