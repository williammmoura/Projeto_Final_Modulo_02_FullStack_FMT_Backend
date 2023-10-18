/**
 * MODELO DE CADASTRO DE USUÁRIOS
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');

const CadUsers = connection.define('cad_users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    
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
        validate: {
            isDate: true,
        }
    },

    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: {
            msg: "Este cpf já está cadastrado."
        },
        len: {
            args: [11, 11], msg: "CPF precisa ter 11 números."
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
            len: {
                args: [8,150], msg: "A senha deve ter no mínimo 8 caracteres."
            },
            strongPassword(value){
                const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/;;
                if (!strongPasswordRegex.test(value)){
                    throw new Error(
                        "Senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caracter especial."
                    )
                }
            }
        },
    },
    status: {
        type: Sequelize.ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo',
    },
},{ underscored: true, paranoid: true });

CadUsers.associate = (models) => {
    CadUsers.belongsTo(models.CadDepositos,{
        foreignKey: "deposito_id",
        allowNull: false
    }),

    CadUsers.hasMany = (models.cadMedicamentos,{
        foreignKey: "medicamento_id",
        allowNull: false
    })
}

module.exports = { CadUsers };