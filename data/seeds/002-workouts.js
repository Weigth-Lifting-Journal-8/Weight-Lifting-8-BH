
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workouts').del()
    .then(function () {
      // Inserts seed entries
      return knex('workouts').insert([
        {
          name: "Shoulders",
          user_id: 1,
          date: new Date(98, 1)
        },
        {
          name: "Legs",
          user_id: 1,
          date: new Date(98, 1)
        },
        {
          name: "Arms",
          user_id: 2,
          date: new Date(98, 1)
        },
        {
          name: "Chest",
          user_id: 2,
          date: new Date(98, 1)
        },
      ]);
    });
};
