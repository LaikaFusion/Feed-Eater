exports.up = function(knex) {
  return knex.schema.createTable("Items", function(item) {
    item.increments("itemId");
    item.json("content");
    item.timestamp("created_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Items");
};
