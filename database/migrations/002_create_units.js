exports.up = async function up(knex) {
  await knex.schema.createTable("units", (table) => {
    table.increments("id").primary();
    table.string("name", 100).notNullable().unique();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("units");
};
