const { query } = require("express-validator");
const { isValidTimeSlot } = require("../utils/timeSlots");

const bookedTimesRules = [
  query("room_id").isInt({ min: 1 }).withMessage("Room id is required"),
  query("date").isISO8601({ strict: true, strictSeparator: true }).withMessage("Valid date required"),
  query("exclude_booking_id").optional().isInt({ min: 1 }).withMessage("Exclude booking id must be positive"),
];

const roomAvailabilityRules = [
  query("date").isISO8601({ strict: true, strictSeparator: true }).withMessage("Valid date required"),
  query("start_time").custom((value) => isValidTimeSlot(value)).withMessage("Start time must be in 30-minute intervals"),
  query("end_time").custom((value, { req }) => {
    if (!isValidTimeSlot(value)) throw new Error("End time must be in 30-minute intervals");
    if (value <= req.query.start_time) throw new Error("End time must be after start time");
    return true;
  }),
  query("exclude_booking_id").optional().isInt({ min: 1 }).withMessage("Exclude booking id must be positive"),
];

module.exports = {
  bookedTimesRules,
  roomAvailabilityRules,
};
