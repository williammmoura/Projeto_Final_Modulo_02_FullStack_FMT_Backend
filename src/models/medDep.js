/**
 * Relação muitos para muitos entre Medicamentos e Depósitos.
 */

const { Sequelize } = require('sequelize');
const { connection } = require('../database/connection');
const { CadMedicamento } = require('./cadMedicamentos'); 
const { CadDeposito } = require('./cadDepositos');

const MedDep = connection.define('med_dep', {
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, { underscored: true, paranoid: true, freezeTableName: true });

// Definindo a relação muitos para muitos entre Medicamentos e Depósitos
CadMedicamento.belongsToMany(CadDeposito, { through: MedDep, foreignKey: 'medicamento_id' });
CadDeposito.belongsToMany(CadMedicamento, { through: MedDep, foreignKey: 'deposito_id' });

module.exports = { MedDep };