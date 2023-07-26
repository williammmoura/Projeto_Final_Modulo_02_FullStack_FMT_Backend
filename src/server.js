/**
 * Configurar e iniciar um servidor HTTP usando o framework Express no Node.js.
 */

//Importações
const express = require('express')
const app = express()
const routes = require('./routes/index')
const { connection } = require('./database/connection')

app.use(express.json()) // Habilitar entrada de dados como json no servidor
app.use(routes)
connection.authenticate()

//Iniciar o servidor
app.listen(3333, () => console.log("Executando o servidor na porta 3333"))