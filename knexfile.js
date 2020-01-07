require('dotenv').config();
// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'development',
      host: '127.0.0.1',
      password: process.env.POSTGRES_PASSWORD,
      user: 'postgres'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    ssl: true
  }
};
