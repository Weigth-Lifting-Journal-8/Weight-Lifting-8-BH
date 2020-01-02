
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();

      tbl.string('email', 128).notNullable().unique();
      tbl.string('password', 255).notNullable();
      tbl.string('firstName', 128).notNullable();
      tbl.string('lastName', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
