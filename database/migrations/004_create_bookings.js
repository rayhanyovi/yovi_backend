exports.up = async function up(knex) {
  await knex.schema.createTable("bookings", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.integer("unit_id").unsigned().notNullable().references("id").inTable("units");
    table.integer("meeting_room_id").unsigned().notNullable().references("id").inTable("meeting_rooms");
    table.date("meeting_date").notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.integer("participant_count").notNullable();
    table.specificType("consumptions", "text[]").notNullable().defaultTo("{}");
    table.timestamps(true, true);

    table.check("?? < ??", ["start_time", "end_time"], "chk_time_order");
    table.check("?? > 0", ["participant_count"], "chk_participant_count_positive");
    table.index(["meeting_room_id", "meeting_date"], "idx_bookings_room_date");
    table.index(["user_id"], "idx_bookings_user");
    table.index(["meeting_date"], "idx_bookings_date");
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("bookings");
};
