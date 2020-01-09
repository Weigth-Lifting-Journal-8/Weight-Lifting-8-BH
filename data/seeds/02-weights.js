
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workout')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('workout').insert([
        { id: 1, date: "1/20/2020", workout_name: 'Legs', user_id: 1 },
        { id: 2, date: "4/20/2020", workout_name: 'Arms', user_id: 1 },
        { id: 3, date: "3/20/2020", workout_name: 'Chest', user_id: 1 },
        { id: 4, date: "11/20/2020", workout_name: 'Shoulders', user_id: 2 },
        { id: 5, date: "4/23/2020", workout_name: 'Cardio', user_id: 2 },
      ]);
    });
};