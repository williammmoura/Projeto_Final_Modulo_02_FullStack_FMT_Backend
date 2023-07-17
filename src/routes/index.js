/**
 * Arquivo para enviar todas as rotas
 */

const { routesFromCadUser } = require('./cadUser.routes')
const { Router } = require('express')

const routes = Router()

routes.use('/api', routesFromCadUser())

module.exports = routes