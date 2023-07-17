'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cadMedicamentos', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      usuario_responsavel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deposito_is: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deposito_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dosagem: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unidade_dosagem: {
        type: Sequelize.ENUM('mg','mcg','g','mL','%', 'Outro'),
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('Medicamento Controlado','Medicamento não Controlado'),
        allowNull: false
      },
      preco_unitario: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cadMedicamentos');
  }
};
