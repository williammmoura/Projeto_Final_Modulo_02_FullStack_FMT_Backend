'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('caduser', { 
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          len:[2,20]
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len:[2, 20]
        }
      },
      genero: {
        type: Sequelize.STRING
      },
      dt_nascimento: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
          isDate: true
        }
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [11, 11]
        }
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
          isStrongPassword: true
        }
      },
      status: {
        type: Sequelize.ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo'
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
    await queryInterface.dropTable('caduser');
  }
};
