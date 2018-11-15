exports.seed = function(knex, promise){
  return knex('users').del()
  .then(function () {
    return knex('users').insert([
      {username: 'shadrach', password: 'password', id: 1},
      {username: 'shadr', password: 'password', id: 2},
      {username: 'lagrimas', password: 'password', id: 3}
    ])
  })
}