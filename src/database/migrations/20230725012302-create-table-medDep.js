'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medDep', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      medicamentos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cad_medicamentos', // Nome da tabela de medicamentos
          key: 'id', // Nome do campo referenciado na tabela de medicamentos
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      depositos_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cad_depositos', // Nome da tabela de depósitos
          key: 'id', // Nome do campo referenciado na tabela de depósitos
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medDep');
  }
};

