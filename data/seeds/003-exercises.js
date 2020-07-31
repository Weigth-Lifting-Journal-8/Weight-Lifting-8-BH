
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('exercises').del()
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert([
        {
          exercise: "Pull-Ups",
          region: "Upper-Body",
          sets: 5,
          reps: 5,
          weight: 225,
          workout_id: 1
        },
        {
          exercise: "Squat",
          region: "Legs",
          sets: 5,
          reps: 5,
          weight: 300,
          workout_id: 2
        },
        {
          exercise: "DB Fly's",
          region: "Chest",
          sets: 3,
          reps: 5,
          weight: 225,
          workout_id: 4
        },
        {
          exercise: "Bench",
          region: "Chest",
          sets: 3,
          reps: 5,
          weight: 225,
          workout_id: 4
        },
        {
          exercise: "EZ Curls",
          region: "Biceps",
          sets: 3,
          reps: 10,
          weight: 60,
          workout_id: 3
        },
      ], "id");
    });
};
