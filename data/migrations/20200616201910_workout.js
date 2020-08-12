
exports.up = function(knex) {
  return knex.schema.createTable('workouts', tbl => {
      tbl.increments();

      tbl.varchar('name', 255)
        .notNullable();
    
      tbl.date('date');

      tbl.boolean('completed')
    
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'); 
  })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('workouts')
};