const { STRING, DATE, ENUM } = require('sequelize')
const { connection } = require('../database/connection')

const CadUser = connection.define("cadUSer",{
    //Aqui vai as colunas da tabela 'cadUser'
    nome: STRING,
    sobrenome: STRING,
    genero: STRING,
    dt_nascimento: DATE,
    cpf: STRING,
    telefone: STRING,
    email:{
        type: STRING,
        unique:{
            msg: "Este e-mail já está cadastrado."
        }
    },
    senha: STRING,
    status: {
        type: ENUM('Ativo', 'Inativo'),
        allowNull: false,
        defaultValue: 'Ativo'
    },
    created_at: DATE,
    updated_at: DATE,
})

module.exports = { CadUser }