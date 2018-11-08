exports.seed = function(knex, promise){
  return knex('users').del()
  .then(function () {
    return knex('users').insert([
      {username: 'shadrach', password: 'password'},
      {username: 'jenn', password: 'password'},
      {username: 'jennifer', password: 'password'}
    ])
  })
}