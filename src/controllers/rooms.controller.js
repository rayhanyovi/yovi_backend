const roomsService = require("../services/rooms.service");
const { success } = require("../utils/ApiResponse");

async function listRooms(_req, res, next) {
  try {
    res.json(success(await roomsService.listRooms()));
  } catch (error) {
    next(error);
  }
}

module.exports = { listRooms };
