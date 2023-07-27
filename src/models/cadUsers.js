/**
 * MODELO DE CADASTRO DE USUÁRIOS
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');

const CadUsers = connection.define('cad_users', {
    nome: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            len: [2, 20],
        },
    },
    sobrenome: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            len: [2, 20],
        },
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: {
            msg: "Este cpf já está cadastrado."
        }
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
        unique: {
            msg: "Este e-mail já está cadastrado."
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [8],
            is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, // Pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número
        },
    },
    status: {
        type: Sequelize.ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo',
    },
},{ underscored: true, paranoid: true, freezeTableName: true});// Objeto de configuração -> Essas opções definem que as colunas da tabela serão nomeadas usando a convenção "snake_case" (underscored) e que o modelo terá suporte a exclusão lógica (soft delete) por meio da coluna "deletedAt". Evita a pluralização do nome do modelo para o nome da tabela.

module.exports = { CadUsers };