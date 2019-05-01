exports.up = function(knex) {
  return knex.schema.createTable("Feeds", function(feed) {
    feed.increments("feedId");
    feed.string("url");
    feed.timestamp("lastChecked");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Feeds");
};
