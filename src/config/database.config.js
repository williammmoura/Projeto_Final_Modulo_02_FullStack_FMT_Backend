
const { config } = require('dotenv') //Lib. 'dotenv' 
config() //Função para o node ler as variáveis de ambiente

const { DIALECT, USERNAMEDB, PASSWORDDB, DATABASE, PORT, LOCALHOST } = process.env

module.exports = {
    dialect: DIALECT,
    username: USERNAMEDB,
    password: PASSWORDDB,
    database: DATABASE,
    port: PORT,
    host: LOCALHOST
}