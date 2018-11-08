// Update with your config settings.
require('dotenv').config();
const path = require('path')

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host:     process.env.POSTGRES_HOSTNAME,
      database: process.env.POSTGRES_DB,
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
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
    debug: false
  }

};
