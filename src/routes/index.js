/**
 * Arquivo para enviar todas as rotas
 */

const { routesFromCadUser } = require('./cadUser.routes')
const { routesFromCadDeposito } = require('./cadDeposito.routes')
const { Router } = require('express')

const routes = Router()

routes.use('/api', routesFromCadUser())
routes.use('/api', routesFromCadDeposito())

module.exports = routes