/**
 * Arquivo de conexão com o banco de dados
 */
const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/database.config')

const connection = new Sequelize(databaseConfig)

module.exports = { connection }