const bookingsRepository = require("../repositories/bookings.repository");
const roomsRepository = require("../repositories/rooms.repository");
const unitsRepository = require("../repositories/units.repository");
const ApiError = require("../utils/ApiError");
const { normalizeDate } = require("../utils/timeSlots");

async function assertReferencesAndCapacity(data) {
  const room = await roomsRepository.findById(data.meeting_room_id);
  if (!room) {
    throw new ApiError(404, "NOT_FOUND", "Meeting room not found");
  }

  const unit = await unitsRepository.findById(data.unit_id);
  if (!unit) {
    throw new ApiError(404, "NOT_FOUND", "Unit not found");
  }

  if (Number(data.participant_count) > room.capacity) {
    throw new ApiError(422, "VALIDATION_ERROR", "Participant count exceeds room capacity", [
      {
        field: "participant_count",
        message: `Must not exceed room capacity (${room.capacity})`,
      },
    ]);
  }

  return { room, unit };
}

async function assertNoConflict(data, excludeBookingId = 0) {
  const conflict = await bookingsRepository.findConflict(
    data.meeting_room_id,
    data.meeting_date,
    data.start_time,
    data.end_time,
    excludeBookingId
  );

  if (conflict) {
    throw new ApiError(
      409,
      "BOOKING_CONFLICT",
      `Room is already booked on ${data.meeting_date} from ${String(conflict.start_time).slice(0, 5)} to ${String(conflict.end_time).slice(0, 5)}`
    );
  }
}

function assertTimeOrder(data) {
  if (data.start_time >= data.end_time) {
    throw new ApiError(422, "VALIDATION_ERROR", "Validation failed", [
      {
        field: "end_time",
        message: "End time must be after start time",
      },
    ]);
  }
}

async function listBookings(userId, { page = 1, limit = 10 }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
  const { data, total } = await bookingsRepository.findAll({ page: safePage, limit: safeLimit }, userId);

  return {
    data,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
}

async function getBooking(userId, id) {
  const booking = await bookingsRepository.findById(id, userId);
  if (!booking) {
    throw new ApiError(404, "NOT_FOUND", "Booking not found");
  }
  return booking;
}

async function createBooking(userId, data) {
  assertTimeOrder(data);
  await assertReferencesAndCapacity(data);
  await assertNoConflict(data);

  return bookingsRepository.create({
    ...data,
    user_id: userId,
  });
}

async function updateBooking(userId, id, updateData) {
  const existing = await bookingsRepository.findRawById(id);
  if (!existing) {
    throw new ApiError(404, "NOT_FOUND", "Booking not found");
  }

  if (existing.user_id !== userId) {
    throw new ApiError(403, "FORBIDDEN", "You can only edit your own bookings");
  }

  const nextData = {
    unit_id: updateData.unit_id ?? existing.unit_id,
    meeting_room_id: updateData.meeting_room_id ?? existing.meeting_room_id,
    meeting_date: updateData.meeting_date ?? normalizeDate(existing.meeting_date),
    start_time: updateData.start_time ?? String(existing.start_time).slice(0, 5),
    end_time: updateData.end_time ?? String(existing.end_time).slice(0, 5),
    participant_count: updateData.participant_count ?? existing.participant_count,
    consumptions: updateData.consumptions ?? existing.consumptions,
  };

  assertTimeOrder(nextData);
  await assertReferencesAndCapacity(nextData);
  await assertNoConflict(nextData, Number(id));
  await bookingsRepository.update(id, updateData);

  return getBooking(userId, id);
}

async function deleteBooking(userId, id) {
  const existing = await bookingsRepository.findRawById(id);
  if (!existing) {
    throw new ApiError(404, "NOT_FOUND", "Booking not found");
  }

  if (existing.user_id !== userId) {
    throw new ApiError(403, "FORBIDDEN", "You can only delete your own bookings");
  }

  await bookingsRepository.remove(id);
  return { message: "Booking deleted successfully" };
}

module.exports = {
  createBooking,
  deleteBooking,
  getBooking,
  listBookings,
  updateBooking,
};
