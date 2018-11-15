// Update with your config settings.
require('dotenv').config();
const path = require('path')
// console.log(process.env)
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host:     process.env.POSTGRES_HOSTNAME,
      database: process.env.POSTGRES_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_CONTAINER_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    },
    debug: true
  }

};
