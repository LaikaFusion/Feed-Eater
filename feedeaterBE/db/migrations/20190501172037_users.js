exports.up = function(knex) {
  return knex.schema.createTable("users", function(user) {
    user.increments("userid");
    user.string("username").unique();
    user.string("hash");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
