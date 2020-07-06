
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('exercises').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('exercises').insert([
        {
          name: "Pull-Ups",
          region: "Upper-Body"
        },
        {
          name: "Squat",
          region: "Legs"
        },
        {
          name: "Bench",
          region: "Chest"
        },
        {
          name: "EZ Curls",
          region: "Biceps"
        },
      ], "id");
    });
};
