  

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('exercises')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert([
        { exercise: 'Squat', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 1 },
        { exercise: 'Deadlift', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 1 },
        { exercise: 'Split Squat', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 1 },
        { exercise: 'Tricep Extension', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 2 },
        { exercise: 'Bicep Curls', weight: 135, units: 'lbs', sets: 4, reps: 7, workout_id: 2 },
        { exercise: 'Bench', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 3 },
        { exercise: 'Incline DB', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 3 },
        { exercise: 'DB Fly', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 3 },
        { exercise: 'Pushups', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 3 },
        { exercise: 'Arnolds', weight: 135, units: 'lbs', sets: 3, reps: 8, workout_id: 4 },
        { exercise: 'Jumping Jacks', weight: 0, units: 'lbs', sets: 3, reps: 8, workout_id: 5 },
      ]);
    });
};