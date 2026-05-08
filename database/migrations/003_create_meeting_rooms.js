exports.up = async function up(knex) {
  await knex.schema.createTable("meeting_rooms", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable().unique();
    table.integer("capacity").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.check("?? > 0", ["capacity"], "chk_room_capacity_positive");
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("meeting_rooms");
};
