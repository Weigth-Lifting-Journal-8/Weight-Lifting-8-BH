
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email:'test@email.com', password: 'password', firstName:'Mike', lastName: 'Trout'},
        { email:'test2@email.com', password: 'password', firstName:'Pablo', lastName: 'Sanchez'}
      ])
    });
};
