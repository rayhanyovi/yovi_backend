const express = require("express");

const bookingsController = require("../controllers/bookings.controller");
const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const {
  bookingIdParam,
  createBookingRules,
  paginationRules,
  updateBookingRules,
} = require("../validators/booking.validator");

const router = express.Router();

router.use(authMiddleware);

router.get("/", paginationRules, validate, bookingsController.listBookings);
router.get("/:id", bookingIdParam, validate, bookingsController.getBooking);
router.post("/", createBookingRules, validate, bookingsController.createBooking);
router.patch("/:id", updateBookingRules, validate, bookingsController.updateBooking);
router.delete("/:id", bookingIdParam, validate, bookingsController.deleteBooking);

module.exports = router;
