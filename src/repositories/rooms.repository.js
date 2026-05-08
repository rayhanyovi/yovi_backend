const db = require("../config/database");

async function findAll() {
  return db("meeting_rooms").select("id", "name", "capacity").orderBy("id");
}

async function findById(id) {
  return db("meeting_rooms").where({ id }).first();
}

module.exports = {
  findAll,
  findById,
};
