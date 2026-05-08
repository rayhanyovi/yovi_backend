const unitsRepository = require("../repositories/units.repository");

async function listUnits() {
  return unitsRepository.findAll();
}

module.exports = { listUnits };
