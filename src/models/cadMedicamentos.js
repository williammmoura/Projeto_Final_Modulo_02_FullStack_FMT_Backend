/**
 * MODELO DE CADASTRO DE MEDICAMENTOS
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');

const CadMedicamento = connection.define('cad_medicamentos',{
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
            model: {
                tableName: "cadUsers"
            }
        },
        key: 'id'
    },

    deposito_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: {
                tableName: "cadDepositos"
            },
        },
    },

    nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    descricao: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    dosagem: {
        type: Sequelize.DECIMAL(10, 2), // Para permitir números decimais com até 10 dígitos no total e 2 casas decimais
        allowNull: false,
    },

    unidade_dosagem: {
        type: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%', 'outro'),
        allowNull: false,
    },

    tipo: {
        type: Sequelize.ENUM('controlado', 'não controlado'),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo "tipo" é obrigatório.'
            },
            isIn: { 
                args: [['controlado','não controlado']],
                msg: "O campo 'tipo' só pode receber os seguintes valores: 'controlado', 'não controlado'."
            }
        }
    },

    preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },

    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { underscored: true, paranoid: true });

CadMedicamento.associate = (models) => {
    CadMedicamento.belongsTo(models.CadUsers,{
        foreignKey: "usuario_id",
        allowNull: false
    }),
    CadMedicamento.belongsTo(models.CadUsers,{
        foreignKey: "deposito_id",
        allowNull: false
    })
}

module.exports = { CadMedicamento };