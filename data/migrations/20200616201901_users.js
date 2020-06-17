
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();

      tbl.varchar('email', 255)
        .unique()
        .notNullable();
    
      tbl.varchar('password', 128)
        .notNullable();
    
      tbl.timestamps(true, true);
        
  })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
