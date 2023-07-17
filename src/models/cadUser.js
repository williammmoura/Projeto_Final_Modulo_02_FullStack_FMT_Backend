const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');

const CadUser = connection.define('cad_user', {
    nome: Sequelize.STRING,
    sobrenome: Sequelize.STRING,
    genero: Sequelize.STRING,
    dt_nascimento: Sequelize.DATE,
    cpf: Sequelize.STRING,
    telefone: Sequelize.STRING,
    email: Sequelize.STRING,
    senha: Sequelize.STRING,
    status: {
        type: Sequelize.ENUM('Ativo', 'Inativo'),
        defaultValue: 'Ativo'
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, { underscored: true, paranoid: true}); // Objeto de configuração -> Essas opções definem que as colunas da tabela serão nomeadas usando a convenção "snake_case" (underscored) e que o modelo terá suporte a exclusão lógica (soft delete) por meio da coluna "deletedAt".

module.exports = { CadUser };