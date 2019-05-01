exports.up = function(knex) {
  return knex.schema.createTable("usersitems", function(ui) {
    ui.integer("userId");
    ui.foreign("userId").references("Users.userId");
    ui.integer("itemId");
    ui.foreign("itemId").references("Items.itemId");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usersitems");
};
