exports.up = function(knex) {
  return knex.schema.createTable("usersfeeds", function(uf) {
    uf.integer("userid");
    uf.foreign("userid").references("Users.userid");
    uf.integer("feedid");
    uf.foreign("feedid").references("Feeds.feedid");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usersfeeds");
};
