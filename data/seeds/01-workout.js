
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workout')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('workout').insert([
        { date: '', workout_name: 'Legs', user_id: 1 },
        { date: '', workout_name: 'Arms', user_id: 1 },
      ]);
    });
};