const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: "hillan1152@gmail.com", 
          password: bcrypt.hashSync("password", 12)
        },
        {
          email: "lebron@gmail.com", 
          password: bcrypt.hashSync("password", 12)
        },
      ],
      "id"
      );
    });
};
