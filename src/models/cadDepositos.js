/**
 * MODELO DE CADASTRO DE DEPÓSITO
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');
const { CadUsers } = require('./cadUsers');

const CadDeposito = connection.define("cad_depositos", {
    //Aqui vai o modelo da tabela 'cadDeposito', que irá para o banco de dados.
    // Definindo a relação de 1 para muitos entre Usuários e Depósitos
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
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
}, { underscored: true, paranoid: true });

CadDeposito.associate = (models) => {
    CadDeposito.belongsTo(models.cadUsers, {
        foreignKey: "usuario_id",
        allowNull: false
    }),

    CadDeposito.hasMany(models.cadMedicamentos, {
        foreignKey: "medicamento_id",
        allowNull: false
    })
}

module.exports = { CadDeposito };