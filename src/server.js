/**
 * Configurar e iniciar um servidor HTTP usando o framework Express no Node.js.
 */

//Importações
const express = require('express')
const app = express()
const routes = require('./routes/index')
const { connection } = require('./database/connection')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger_output.json");


app.use(express.json()) // Habilitar entrada de dados como json no servidor
app.use(routes)
connection.authenticate()
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) //Middleware responsável por criar uma interface gráfica do Swagger

//Iniciar o servidor
app.listen(3333, () => console.log("Executando o servidor na porta 3333"))