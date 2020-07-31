
exports.up = function(knex) {
  return knex.schema.createTable('exercises', tbl => {
      tbl.increments();

      tbl.varchar('exercise', 255)
        .notNullable();

      tbl.varchar('region', 255)
        .notNullable();
  // ADDING REPS, SETS, WEIGHT (7/31)
      tbl.integer('reps', 255)
        .notNullable();

      tbl.integer('sets', 255)
        .notNullable();
      
      tbl.integer('weight', 4)
        .notNullable();
  // ADDING WORKOUT_ID FOREIGN KEY (7/31)
      tbl.integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'); 
  })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('exercises')
};