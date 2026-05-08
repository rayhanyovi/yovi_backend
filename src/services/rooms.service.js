const roomsRepository = require("../repositories/rooms.repository");

async function listRooms() {
  return roomsRepository.findAll();
}

module.exports = { listRooms };
