exports.up = function(knex) {
  return knex.schema.createTable("feeds", function(feed) {
    feed.incriments("feedId");
    feed.string("url");
    feed.timestamp("lastChecked");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("feeds");
};
