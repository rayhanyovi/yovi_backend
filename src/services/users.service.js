const usersRepository = require("../repositories/users.repository");

async function listUsers() {
  return usersRepository.findAll();
}

module.exports = { listUsers };
