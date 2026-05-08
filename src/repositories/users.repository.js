const db = require("../config/database");

function publicColumns() {
  return ["id", "name", "email", "created_at", "updated_at"];
}

async function findAll() {
  return db("users").select("id", "name", "email").orderBy("id");
}

async function findByEmail(email) {
  return db("users").where({ email }).first();
}

async function findById(id) {
  return db("users").select(publicColumns()).where({ id }).first();
}

module.exports = {
  findAll,
  findByEmail,
  findById,
};
