exports.up = function(knex) {
  return knex.schema.createTable("items", function(item) {
    item.increments("itemid");
    item.json("content");
    item.timestamp("created_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Items");
};
