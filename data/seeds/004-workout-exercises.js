
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workout_exercises').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('workout_exercises').insert([
        {
          reps: "10",
          sets: "3",
          weight: 225,
          workout_id: 4,
          exercise_id: 3
        },
        {
          reps: "15",
          sets: "2",
          weight: 0,
          workout_id: 1,
          exercise_id: 1
        },
        {
          reps: "8",
          sets: "5",
          weight: 225,
          workout_id: 2,
          exercise_id: 2
        }
      ], "id");
    });
};