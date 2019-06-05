exports.up = function(knex) {
  return knex.schema.createTable("feeds", function(feed) {
    feed.increments("feedid");
    feed.string("url");
    feed.timestamp("lastchecked");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Feeds");
};
