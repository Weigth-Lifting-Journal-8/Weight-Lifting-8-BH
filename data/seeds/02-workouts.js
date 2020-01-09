
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workout')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('workout').insert([
        { date: "1/20/2020", workout_name: 'Legs', user_id: 1 },
        { date: "4/20/2020", workout_name: 'Arms', user_id: 1 },
        { date: "3/20/2020", workout_name: 'Chest', user_id: 1 },
        { date: "11/20/2020", workout_name: 'Shoulders', user_id: 2 },
        { date: "4/23/2020", workout_name: 'Cardio', user_id: 2 },
      ]);
    });
};