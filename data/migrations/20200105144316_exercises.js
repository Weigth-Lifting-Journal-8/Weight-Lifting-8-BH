
exports.up = function(knex) {
    return knex.schema.createTable('exercises', tbl => {
        tbl.increments();
        
        tbl.integer('exercise', 255).notNullable();
        tbl.integer('weight', 255).notNullable();

        tbl.string('units', 128)
            .defaultTo('lbs')
            .notNullable();

        tbl.integer('sets', 255).notNullable();
        
        tbl.integer('reps', 255).notNullable();
         
        tbl.integer('workout_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('workout')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
    })};
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('exercises');
  };