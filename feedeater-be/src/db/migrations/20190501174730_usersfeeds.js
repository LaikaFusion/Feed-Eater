exports.up = function(knex) {
  return knex.schema.createTable("usersfeeds", function(uf) {
    uf.foreign("userId").references("Users.userId");
    uf.foreign("feedId").references("Feeds.feedId");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usersfeeds");
};
