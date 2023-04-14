require('dotenv').config()

module.exports = {
  development: {
    database: 'dev_db',
    password: '1234',
    userName: 'namgiho',
    options: {
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      }
    },
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}