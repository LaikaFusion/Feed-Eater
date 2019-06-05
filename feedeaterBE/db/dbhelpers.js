const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addUser: (body) => {
    return db("users").insert({ ...body });
  },
  findUser:  (user) => {
    return db("Users")
    .where({username: user})
  }
};