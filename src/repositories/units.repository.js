const db = require("../config/database");

async function findAll() {
  return db("units").select("id", "name").orderBy("id");
}

async function findById(id) {
  return db("units").where({ id }).first();
}

module.exports = {
  findAll,
  findById,
};
