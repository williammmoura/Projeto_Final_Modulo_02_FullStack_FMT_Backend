/**
 * Arquivo para enviar todas as rotas
 */

const { Router } = require('express')
const { routesFromCadUseers } = require('./cadUsers.routes')
const { routesFromCadDepositos } = require('./cadDepositos.routes')
const { routesFromCadMedicamentos } = require('./cadMedicamentos.routes')

const routes = new Router()

routes.use('/api', [
    routesFromCadUseers(),
    routesFromCadDepositos(),
    routesFromCadMedicamentos()
])

module.exports = routes