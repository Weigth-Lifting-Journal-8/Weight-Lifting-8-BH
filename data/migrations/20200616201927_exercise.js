
exports.up = function(knex) {
  return knex.schema.createTable('exercises', tbl => {
      tbl.increments();

      tbl.varchar('name', 255)
        .notNullable();

      tbl.varchar('region', 255)
        .notNullable();
  })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('exercises')
};