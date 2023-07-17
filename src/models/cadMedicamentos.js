const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');

const CadMedicamento = connection.define('cadMedicamento', {
    usuario_responsavel: Sequelize.STRING,
    deposito_id: Sequelize.STRING,
    nome_medicamento: Sequelize.STRING,
    nome_laboratorio: Sequelize.STRING,
    descricao: Sequelize.STRING,
    dosagem: Sequelize.INTEGER,
    unidade_dosagem: Sequelize.ENUM('mg', 'mcg', 'g', 'mL', '%', 'Outro'),
    tipo: Sequelize.ENUM('Medicamento Controlado', 'Medicamento não Controlado'),
    preco_unitario: Sequelize.FLOAT,
    quantidade: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
}, { underscored: true, paranoid: true}); // Permite que as colunas sejam nomeadas em "snake_case" e habilitando o recurso de exclusão lógica (soft delete) através da coluna "deletedAt".

module.exports = { CadMedicamento };