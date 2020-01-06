
exports.up = function(knex) {
    return knex.schema.createTable('workout', tbl => {
        tbl.increments();
  
        tbl.date('date', 128)
            .notNullable()
            .defaultTo(knex.fn.now());
        
        tbl.string('workout_name', 255).notNullable();
        
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('workout');
  };