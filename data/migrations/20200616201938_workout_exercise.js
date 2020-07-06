
exports.up = async function(knex) {
  return knex.schema.createTable('workout_exercises', tbl => {
      tbl.increments();

      tbl.integer('reps', 255)
        .notNullable();

      tbl.integer('sets', 255)
        .notNullable();
      
      tbl.integer('weight', 4)
        .notNullable();
    
      tbl.integer('workout_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('workouts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'); 

      tbl.integer('exercise_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('exercises')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'); 
  })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('workout_exercises')
};