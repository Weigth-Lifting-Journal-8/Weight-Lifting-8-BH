

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workout')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('workout').insert([
        { date: "1/20/2020", workout_name: 'Legs', user_id: 1 },
        { date: "4/20/2020", workout_name: 'Arms', user_id: 1 },
        { date: "3/20/2020", workout_name: 'Chest', user_id: 1 },
      ]);
    });
};