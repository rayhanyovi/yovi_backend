const { body, param, query } = require("express-validator");
const { CONSUMPTION_TYPES, isValidTimeSlot } = require("../utils/timeSlots");

const bookingIdParam = [
  param("id").isInt({ min: 1 }).withMessage("Booking id must be a positive integer"),
];

const paginationRules = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
];

const createBookingRules = [
  body("unit_id").isInt({ min: 1 }).withMessage("Unit is required"),
  body("meeting_room_id").isInt({ min: 1 }).withMessage("Meeting room is required"),
  body("meeting_date").isISO8601({ strict: true, strictSeparator: true }).withMessage("Valid date required"),
  body("start_time").custom((value) => isValidTimeSlot(value)).withMessage("Must be in 30-minute intervals"),
  body("end_time").custom((value, { req }) => {
    if (!isValidTimeSlot(value)) throw new Error("Must be in 30-minute intervals");
    if (value <= req.body.start_time) throw new Error("End time must be after start time");
    return true;
  }),
  body("participant_count").isInt({ min: 1 }).withMessage("Must be a positive number"),
  body("consumptions").optional().isArray().withMessage("Must be an array"),
  body("consumptions.*").optional().isIn(CONSUMPTION_TYPES).withMessage("Invalid consumption type"),
];

const updateBookingRules = [
  ...bookingIdParam,
  body("unit_id").optional().isInt({ min: 1 }).withMessage("Unit is required"),
  body("meeting_room_id").optional().isInt({ min: 1 }).withMessage("Meeting room is required"),
  body("meeting_date").optional().isISO8601({ strict: true, strictSeparator: true }).withMessage("Valid date required"),
  body("start_time").optional().custom((value) => isValidTimeSlot(value)).withMessage("Must be in 30-minute intervals"),
  body("end_time").optional().custom((value, { req }) => {
    if (!isValidTimeSlot(value)) throw new Error("Must be in 30-minute intervals");
    if (req.body.start_time && value <= req.body.start_time) {
      throw new Error("End time must be after start time");
    }
    return true;
  }),
  body("participant_count").optional().isInt({ min: 1 }).withMessage("Must be a positive number"),
  body("consumptions").optional().isArray().withMessage("Must be an array"),
  body("consumptions.*").optional().isIn(CONSUMPTION_TYPES).withMessage("Invalid consumption type"),
];

module.exports = {
  bookingIdParam,
  createBookingRules,
  paginationRules,
  updateBookingRules,
};
