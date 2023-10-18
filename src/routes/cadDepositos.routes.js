const { criarDeposito, atualizarDeposito, atualizarStatusDeposito, listarDepositos, consultarDepositoPorId, excluirDeposito } = require('../controllers/cadDeposito.controller')
const { Router } = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware')

class CadDepositosRouter {
    routesFromCadDepositos(){
        const cadDepositosRoutes = Router()

        cadDepositosRoutes.post('/depositos', criarDeposito)
        cadDepositosRoutes.patch('/depositos/:id', atualizarDeposito)

        //Endpoint privados
        cadDepositosRoutes.patch('/depositos/:id/status', authMiddleware,  atualizarStatusDeposito)
        cadDepositosRoutes.get('/depositos', authMiddleware, listarDepositos)
        cadDepositosRoutes.get('/depositos/:id', authMiddleware, consultarDepositoPorId)
        cadDepositosRoutes.delete('/depositos/:id', authMiddleware, excluirDeposito)

        return cadDepositosRoutes
    }
}

module.exports = new CadDepositosRouter()