
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'test@email.com', password: 'password', firstName: 'Paul', lastName: 'Blart'},
        {id: 2, email: 'Anothertest@email.com', password: 'password', firstName: 'Mike', lastName: 'Trout'},
      ]);
    });
};