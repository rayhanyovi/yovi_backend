const availabilityService = require("../services/availability.service");
const { success } = require("../utils/ApiResponse");

async function getBookedTimes(req, res, next) {
  try {
    const data = await availabilityService.getBookedTimes(
      Number(req.query.room_id),
      req.query.date,
      Number(req.query.exclude_booking_id || 0)
    );
    res.json(success(data));
  } catch (error) {
    next(error);
  }
}

async function getRoomAvailability(req, res, next) {
  try {
    const data = await availabilityService.getRoomAvailability(
      req.query.date,
      req.query.start_time,
      req.query.end_time,
      Number(req.query.exclude_booking_id || 0)
    );
    res.json(success(data));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBookedTimes,
  getRoomAvailability,
};
