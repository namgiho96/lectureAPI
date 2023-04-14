const { Sequelize } = require('sequelize');

const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PW,
} = process.env;

const db = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PW, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

module.exports = db;
