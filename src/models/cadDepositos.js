const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');

const CadDeposito = connection.define("cadDeposito", {
    //Aqui vai as colunas da tabela 'cadDeposito'
    usuario_id: Sequelize.INTEGER,
    razao_social: Sequelize.STRING,
    cnpj: Sequelize.STRING,
    nome_fantasia: Sequelize.STRING,
    email: Sequelize.STRING,
    telefone: Sequelize.STRING,
    celular: Sequelize.STRING,
    cep: Sequelize.STRING,
    endereco: Sequelize.STRING,
    numero: Sequelize.STRING,
    bairro: Sequelize.STRING,
    cidade: Sequelize.STRING,
    estado: Sequelize.STRING,
    complemento: Sequelize.STRING,
    latitude: Sequelize.STRING,
    longitude: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, { underscored: true, paranoid: true}); // Objeto de configuração -> Essas opções definem que as colunas da tabela serão nomeadas usando a convenção "snake_case" (underscored) e que o modelo terá suporte a exclusão lógica (soft delete) por meio da coluna "deletedAt".

module.exports = { CadDeposito };