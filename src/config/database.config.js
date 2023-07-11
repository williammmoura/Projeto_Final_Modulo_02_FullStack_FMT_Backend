const { config } = require('dotenv')
config()

module.exports = {
    dialect: process.env.DIALECT, //Qual banco de dados está utilizando;
    host: process.env.HOST, //Qual servidor está utilizando;
    username: process.env.USERNAMEDB, //Qual o nome do seu usuário no postgres;
    password: process.env.PASSWORDDB, //Qual a senha do seu usuário no postgres;
    database: process.env.DATABASE, //Qual o nome do seu database no postgres;
    port: process.env.PORT, //Qual porta do seu postgres;
    define: {
        underscored: true,
        underscoredAll: true
    }
};