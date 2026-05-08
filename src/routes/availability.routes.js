const express = require("express");

const availabilityController = require("../controllers/availability.controller");
const validate = require("../middleware/validate");
const {
  bookedTimesRules,
  roomAvailabilityRules,
} = require("../validators/availability.validator");

const router = express.Router();

router.get("/times", bookedTimesRules, validate, availabilityController.getBookedTimes);
router.get("/rooms", roomAvailabilityRules, validate, availabilityController.getRoomAvailability);

module.exports = router;
