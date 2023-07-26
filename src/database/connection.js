/**
 * Arquivo de conexão com o banco de dados
 */
const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config');

const connection = new Sequelize(databaseConfig) // Instância de conexão com o banco de dados utilizando como argumento o objeto de acesso ao banco de dados

module.exports = { connection };