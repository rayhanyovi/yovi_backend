const express = require("express");

const unitsController = require("../controllers/units.controller");

const router = express.Router();

router.get("/", unitsController.listUnits);

module.exports = router;
