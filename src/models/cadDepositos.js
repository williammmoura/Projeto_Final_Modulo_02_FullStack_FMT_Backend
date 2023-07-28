/**
 * MODELO DE CADASTRO DE DEPÓSITO
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');
const { CadUsers } = require('./cadUsers');

const CadDeposito = connection.define("cad_depositos", {
    //Aqui vai o modelo da tabela 'cadDeposito', que irá para o banco de dados.
    // Definindo a relação de 1 para muitos entre Usuários e Depósitos
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: CadUsers,
            key: 'id',
        },
    },
    razao_social: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg:"Razão Social já cadastrada."
        },
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg:"CPNJ já cadastrado."
        },
    },
    nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logradouro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    latitude: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    longitude: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status: {
        type: Sequelize.ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo',
    },
}, { underscored: true, paranoid: true, freezeTableName: true }); // Objeto de configuração -> Essas opções definem que as colunas da tabela serão nomeadas usando a convenção "snake_case" (underscored) e que o modelo terá suporte a exclusão lógica (soft delete) por meio da coluna "deletedAt". Evita a pluralização do nome do modelo para o nome da tabela.

// Definindo a relação de 1 para muitos entre Usuários e Depósitos
CadUsers.hasMany(CadDeposito, { foreignKey: 'usuario_id' });
CadDeposito.belongsTo(CadUsers, { foreignKey: 'usuario_id' });

module.exports = { CadDeposito };