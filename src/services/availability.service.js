const bookingsRepository = require("../repositories/bookings.repository");
const roomsRepository = require("../repositories/rooms.repository");

async function getBookedTimes(roomId, date, excludeBookingId = 0) {
  const bookedSlots = await bookingsRepository.findBookedSlots(roomId, date, excludeBookingId);

  return {
    room_id: Number(roomId),
    date,
    booked_slots: bookedSlots,
  };
}

async function getRoomAvailability(date, startTime, endTime, excludeBookingId = 0) {
  const rooms = await roomsRepository.findAll();
  const unavailableRoomIds = await bookingsRepository.findUnavailableRoomIds(
    date,
    startTime,
    endTime,
    excludeBookingId
  );
  const unavailableSet = new Set(unavailableRoomIds);

  return {
    date,
    start_time: startTime,
    end_time: endTime,
    rooms: rooms.map((room) => ({
      ...room,
      available: !unavailableSet.has(room.id),
    })),
  };
}

module.exports = {
  getBookedTimes,
  getRoomAvailability,
};
