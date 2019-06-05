exports.up = function(knex) {
  return knex.schema.createTable("usersitems", function(ui) {
    ui.integer("userid");
    ui.foreign("userid").references("Users.userid");
    ui.integer("itemid");
    ui.foreign("itemid").references("Items.itemid");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usersitems");
};
