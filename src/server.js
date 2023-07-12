/**
 * Configurar e iniciar um servidor HTTP usando o framework Express no Node.js.
 */

//Importações
const express = require('express')
const app = express()

app.listen(3333, () => console.log("Executando o servidor na porta 3333"))