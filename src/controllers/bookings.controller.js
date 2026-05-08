const bookingsService = require("../services/bookings.service");
const { success } = require("../utils/ApiResponse");

async function listBookings(req, res, next) {
  try {
    const result = await bookingsService.listBookings(req.user.id, req.query);
    res.json(success(result.data, { pagination: result.pagination }));
  } catch (error) {
    next(error);
  }
}

async function getBooking(req, res, next) {
  try {
    res.json(success(await bookingsService.getBooking(req.user.id, Number(req.params.id))));
  } catch (error) {
    next(error);
  }
}

async function createBooking(req, res, next) {
  try {
    const data = await bookingsService.createBooking(req.user.id, req.body);
    res.status(201).json(success(data));
  } catch (error) {
    next(error);
  }
}

async function updateBooking(req, res, next) {
  try {
    const data = await bookingsService.updateBooking(req.user.id, Number(req.params.id), req.body);
    res.json(success(data));
  } catch (error) {
    next(error);
  }
}

async function deleteBooking(req, res, next) {
  try {
    const data = await bookingsService.deleteBooking(req.user.id, Number(req.params.id));
    res.json(success(data));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBooking,
  deleteBooking,
  getBooking,
  listBookings,
  updateBooking,
};
