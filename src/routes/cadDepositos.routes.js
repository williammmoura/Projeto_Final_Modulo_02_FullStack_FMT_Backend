const { criarDeposito, atualizarDeposito, atualizarStatusDeposito, listarDepositos, consultarDepositoPorId, excluirDeposito } = require('../controllers/cadDeposito.controller')
const { Router } = require('express')

class CadDepositosRouter {
    routesFromCadDepositos(){
        const cadDepositosRoutes = Router()

        cadDepositosRoutes.post('/depositos', criarDeposito)
        cadDepositosRoutes.patch('/depositos/:identificador', atualizarDeposito)

        //Endpoint privados
        cadDepositosRoutes.patch('/depositos/:identificador/status', atualizarStatusDeposito)
        cadDepositosRoutes.get('/depositos', listarDepositos)
        cadDepositosRoutes.get('/depositos/:identificador', consultarDepositoPorId)
        cadDepositosRoutes.delete('/depositos/:identificador',excluirDeposito)

        return cadDepositosRoutes
    }
}

module.exports = new CadDepositosRouter()