exports.up = function(knex) {
  return knex.schema.createTable("usersitems", function(ui) {
    ui.foreign("userId").references("Users.userId");
    ui.foreign("itemId").references("Items.itemId");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usersitems");
};
