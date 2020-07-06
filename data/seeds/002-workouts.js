
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('workouts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('workouts').insert([
        {
          name: "Shoulders",
          user_id: 1,
          date: 3/12/2020
        },
        {
          name: "Legs",
          user_id: 1,
          date: 3/20/2020
        },
        {
          name: "Arms",
          user_id: 2,
          date: 3/12/2020
        },
        {
          name: "Chest",
          user_id: 2,
          date: 3/12/2020
        },
      ], "id");
    });
};
