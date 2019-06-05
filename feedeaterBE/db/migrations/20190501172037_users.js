exports.up = function(knex) {
  return knex.schema.createTable("users", function(user) {
    user.increments("userid");
    user.string("username");
    user.string("hash");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Users");
};
