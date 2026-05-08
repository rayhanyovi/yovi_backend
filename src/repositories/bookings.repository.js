const db = require("../config/database");
const { normalizeDate, normalizeTime } = require("../utils/timeSlots");

function serializeBooking(row, currentUserId = undefined) {
  if (!row) return null;

  const booking = {
    id: row.id,
    unit: {
      id: row.unit_id,
      name: row.unit_name,
    },
    meeting_room: {
      id: row.meeting_room_id,
      name: row.meeting_room_name,
      capacity: row.meeting_room_capacity,
    },
    meeting_date: normalizeDate(row.meeting_date),
    start_time: normalizeTime(row.start_time),
    end_time: normalizeTime(row.end_time),
    participant_count: row.participant_count,
    consumptions: row.consumptions || [],
    user: {
      id: row.user_id,
      name: row.user_name,
    },
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  if (currentUserId !== undefined) {
    booking.is_owner = row.user_id === currentUserId;
  }

  return booking;
}

function serializeRawBooking(row) {
  if (!row) return null;

  return {
    id: row.id,
    user_id: row.user_id,
    unit_id: row.unit_id,
    meeting_room_id: row.meeting_room_id,
    meeting_date: normalizeDate(row.meeting_date),
    start_time: normalizeTime(row.start_time),
    end_time: normalizeTime(row.end_time),
    participant_count: row.participant_count,
    consumptions: row.consumptions || [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function joinedQuery() {
  return db("bookings")
    .join("users", "bookings.user_id", "users.id")
    .join("units", "bookings.unit_id", "units.id")
    .join("meeting_rooms", "bookings.meeting_room_id", "meeting_rooms.id")
    .select(
      "bookings.*",
      "users.name as user_name",
      "units.name as unit_name",
      "meeting_rooms.name as meeting_room_name",
      "meeting_rooms.capacity as meeting_room_capacity"
    );
}

async function findAll({ page, limit }, currentUserId) {
  const offset = (page - 1) * limit;
  const [{ count }] = await db("bookings").count({ count: "*" });
  const rows = await joinedQuery()
    .orderBy("bookings.meeting_date", "desc")
    .orderBy("bookings.start_time", "asc")
    .limit(limit)
    .offset(offset);

  return {
    data: rows.map((row) => serializeBooking(row, currentUserId)),
    total: Number(count),
  };
}

async function findById(id, currentUserId = undefined) {
  const row = await joinedQuery().where("bookings.id", id).first();
  return serializeBooking(row, currentUserId);
}

async function findRawById(id) {
  return db("bookings").where({ id }).first();
}

async function create(data) {
  const [row] = await db("bookings").insert(data).returning("*");
  return serializeRawBooking(row);
}

async function update(id, data) {
  const [row] = await db("bookings")
    .where({ id })
    .update({ ...data, updated_at: db.fn.now() })
    .returning("*");
  return serializeRawBooking(row);
}

async function remove(id) {
  return db("bookings").where({ id }).del();
}

async function findConflict(roomId, date, startTime, endTime, excludeBookingId = 0) {
  return db("bookings")
    .where("meeting_room_id", roomId)
    .where("meeting_date", date)
    .where("start_time", "<", endTime)
    .where("end_time", ">", startTime)
    .whereNot("id", excludeBookingId)
    .first();
}

async function findBookedSlots(roomId, date, excludeBookingId = 0) {
  const rows = await db("bookings")
    .select("id as booking_id", "start_time", "end_time")
    .where("meeting_room_id", roomId)
    .where("meeting_date", date)
    .whereNot("id", excludeBookingId)
    .orderBy("start_time");

  return rows.map((row) => ({
    booking_id: row.booking_id,
    start_time: normalizeTime(row.start_time),
    end_time: normalizeTime(row.end_time),
  }));
}

async function findUnavailableRoomIds(date, startTime, endTime, excludeBookingId = 0) {
  const rows = await db("bookings")
    .distinct("meeting_room_id")
    .where("meeting_date", date)
    .where("start_time", "<", endTime)
    .where("end_time", ">", startTime)
    .whereNot("id", excludeBookingId);

  return rows.map((row) => row.meeting_room_id);
}

module.exports = {
  create,
  findAll,
  findBookedSlots,
  findById,
  findConflict,
  findRawById,
  findUnavailableRoomIds,
  remove,
  update,
};
