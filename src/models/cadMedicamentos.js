/**
 * MODELO DE CADASTRO DE MEDICAMENTOS
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');
const { CadUsers } = require('./cadUsers');

const CadMedicamento = connection.define('cad_medicamentos',{
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: CadUsers,
            key: 'id',
        },
    },
    deposito: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
        allowNull: false,
    },
    tipo: {
        type: Sequelize.ENUM('Medicamento Controlado', 'Medicamento Não Controlado'),
        allowNull: false,
    },
    preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { underscored: true, paranoid: true, freezeTableName: true }); // Permite que as colunas sejam nomeadas em "snake_case" e habilitando o recurso de exclusão lógica (soft delete) através da coluna "deletedAt". Evita a pluralização do nome do modelo para o nome da tabela.

// Definindo a relação de 1 para muitos entre Usuários e Medicamentos
CadUsers.hasMany(CadMedicamento, { foreignKey: 'usuario_id' });
CadMedicamento.belongsTo(CadUsers, { foreignKey: 'usuario_id' });

module.exports = { CadMedicamento };