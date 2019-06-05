const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addUser: (user,hashpw) => {
    return db("users").insert({username:user,hash:hashpw });
  },
  findUser:  (user) => {
    return db("users")
    .where({username: user}).first()
  }
};