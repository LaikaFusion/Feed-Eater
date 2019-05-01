exports.up = function(knex) {
  return knex.schema.createTable("Users", function(user) {
    user.incriments("userId");
    user.string("username");
    user.string("hash");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Users");
};
