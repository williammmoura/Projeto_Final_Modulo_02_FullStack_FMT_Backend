/**
 * Arquivo para enviar todas as rotas
 */

const { routesFromCadUser } = require('./cadUser.routes')
const { routesFromCadDeposito } = require('./cadDeposito.routes')
const { routesFromCadMedicamento } = require('./cadMedicamento.routes')
const { Router } = require('express')

const routes = Router()

routes.use('/api', routesFromCadUser())
routes.use('/api', routesFromCadDeposito())
routes.use('/api', routesFromCadMedicamento())

module.exports = routes