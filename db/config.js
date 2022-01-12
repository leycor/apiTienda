// Configuración de la base de datos

const Sequelize = require('sequelize')
require('dotenv').config({path:'./.env'})

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_DIALECT = process.env.DB_DIALECT

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_DIALECT
})

module.exports = sequelize;