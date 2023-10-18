'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cad_medicamentos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      usuario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cad_users'
          },
          key: 'id'
        },
        allowNull: false
      },

      deposito_id:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cad_depositos'
          },
          key: 'id'
        },
        allowNull: false
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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      unidade_dosagem: {
        type: Sequelize.ENUM('mg', 'msg', 'g', 'mL', '%', 'outro'),
        allowNull: false,
      },

      tipo: {
        type: Sequelize.ENUM('controlado', 'não controlado'),
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

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cad_medicamentos');
  }
};