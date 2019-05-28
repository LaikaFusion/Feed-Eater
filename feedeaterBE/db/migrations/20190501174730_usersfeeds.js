exports.up = function(knex) {
  return knex.schema.createTable("usersfeeds", function(uf) {
    uf.integer("userId");
    uf.foreign("userId").references("Users.userId");
    uf.integer("feedId");
    uf.foreign("feedId").references("Feeds.feedId");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usersfeeds");
};
