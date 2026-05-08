const bcrypt = require("bcryptjs");

exports.seed = async function seed(knex) {
  await knex("bookings").del();
  await knex("meeting_rooms").del();
  await knex("units").del();
  await knex("users").del();

  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE units_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE meeting_rooms_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE bookings_id_seq RESTART WITH 1");

  const passwordHash = await bcrypt.hash("password123", 10);

  await knex("users").insert([
    { id: 1, name: "John Doe", email: "john@example.com", password_hash: passwordHash },
    { id: 2, name: "Jane Smith", email: "jane@example.com", password_hash: passwordHash },
    { id: 3, name: "Ahmad Rizky", email: "ahmad@example.com", password_hash: passwordHash },
  ]);

  await knex("units").insert([
    { id: 1, name: "Unit Keuangan" },
    { id: 2, name: "Unit SDM" },
    { id: 3, name: "Unit Marketing" },
    { id: 4, name: "Unit IT" },
  ]);

  await knex("meeting_rooms").insert([
    { id: 1, name: "Ruang Prambanan", capacity: 10 },
    { id: 2, name: "Ruang Borobudur", capacity: 20 },
    { id: 3, name: "Ruang Merapi", capacity: 8 },
    { id: 4, name: "Ruang Bromo", capacity: 15 },
    { id: 5, name: "Ruang Semeru", capacity: 30 },
  ]);

  await knex("bookings").insert([
    { user_id: 1, unit_id: 1, meeting_room_id: 1, meeting_date: "2024-12-11", start_time: "11:00", end_time: "13:00", participant_count: 8, consumptions: ["SNACK_SIANG", "MAKAN_SIANG"] },
    { user_id: 2, unit_id: 2, meeting_room_id: 1, meeting_date: "2024-12-11", start_time: "14:00", end_time: "15:30", participant_count: 5, consumptions: ["SNACK_SORE"] },
    { user_id: 1, unit_id: 3, meeting_room_id: 2, meeting_date: "2024-12-12", start_time: "09:00", end_time: "11:00", participant_count: 15, consumptions: ["SNACK_SIANG"] },
    { user_id: 3, unit_id: 4, meeting_room_id: 3, meeting_date: "2024-12-12", start_time: "13:00", end_time: "14:30", participant_count: 6, consumptions: ["MAKAN_SIANG", "SNACK_SORE"] },
    { user_id: 2, unit_id: 1, meeting_room_id: 4, meeting_date: "2024-12-13", start_time: "10:00", end_time: "12:00", participant_count: 12, consumptions: ["SNACK_SIANG", "MAKAN_SIANG"] },
    { user_id: 1, unit_id: 2, meeting_room_id: 5, meeting_date: "2024-12-13", start_time: "13:00", end_time: "15:00", participant_count: 25, consumptions: ["SNACK_SORE"] },
    { user_id: 3, unit_id: 3, meeting_room_id: 2, meeting_date: "2024-12-14", start_time: "08:30", end_time: "10:00", participant_count: 10, consumptions: [] },
    { user_id: 2, unit_id: 4, meeting_room_id: 3, meeting_date: "2024-12-14", start_time: "10:30", end_time: "12:00", participant_count: 7, consumptions: ["MAKAN_SIANG"] },
    { user_id: 1, unit_id: 1, meeting_room_id: 1, meeting_date: "2024-12-15", start_time: "09:00", end_time: "10:30", participant_count: 9, consumptions: ["SNACK_SIANG"] },
    { user_id: 3, unit_id: 2, meeting_room_id: 4, meeting_date: "2024-12-15", start_time: "14:00", end_time: "16:00", participant_count: 14, consumptions: ["SNACK_SORE"] },
    { user_id: 2, unit_id: 3, meeting_room_id: 5, meeting_date: "2024-12-16", start_time: "08:00", end_time: "09:30", participant_count: 20, consumptions: [] },
    { user_id: 1, unit_id: 4, meeting_room_id: 2, meeting_date: "2024-12-16", start_time: "11:00", end_time: "12:30", participant_count: 18, consumptions: ["MAKAN_SIANG"] },
    { user_id: 3, unit_id: 1, meeting_room_id: 3, meeting_date: "2024-12-17", start_time: "15:00", end_time: "17:00", participant_count: 8, consumptions: ["SNACK_SORE"] },
    { user_id: 2, unit_id: 2, meeting_room_id: 4, meeting_date: "2024-12-17", start_time: "09:30", end_time: "11:00", participant_count: 11, consumptions: ["SNACK_SIANG"] },
    { user_id: 1, unit_id: 3, meeting_room_id: 5, meeting_date: "2024-12-18", start_time: "13:30", end_time: "15:30", participant_count: 22, consumptions: ["SNACK_SORE", "MAKAN_SIANG"] },
    { user_id: 3, unit_id: 4, meeting_room_id: 1, meeting_date: "2024-12-18", start_time: "08:00", end_time: "09:00", participant_count: 6, consumptions: [] },
    { user_id: 2, unit_id: 1, meeting_room_id: 2, meeting_date: "2024-12-19", start_time: "10:00", end_time: "11:30", participant_count: 13, consumptions: ["SNACK_SIANG"] },
    { user_id: 1, unit_id: 2, meeting_room_id: 3, meeting_date: "2024-12-19", start_time: "14:30", end_time: "16:30", participant_count: 6, consumptions: ["SNACK_SORE"] },
    { user_id: 3, unit_id: 3, meeting_room_id: 4, meeting_date: "2024-12-20", start_time: "11:30", end_time: "13:00", participant_count: 12, consumptions: ["MAKAN_SIANG"] },
    { user_id: 2, unit_id: 4, meeting_room_id: 5, meeting_date: "2024-12-20", start_time: "16:00", end_time: "17:30", participant_count: 28, consumptions: ["SNACK_SORE"] },
  ]);
};
