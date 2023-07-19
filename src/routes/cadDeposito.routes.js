const { createOneDeposito, atualizaDeposito, atualizaDepositoStatus, listDepositos, listaDepositoId, deleteDeposito } = require('../controllers/cadDeposito.controller')
const { Router } = require('express')
const  = require('../middleware/auth') // Rotas PRIVADAS

class CadDepositoRouter {
    routesFromCadDeposito(){
        const cadDepositoRoutes = Router()
        cadDepositoRoutes.post('/depositos', auth, createOneDeposito)
        cadDepositoRoutes.patch('/depositos/:id', auth, atualizaDeposito)
        cadDepositoRoutes.patch('/depositos/:id/status', atualizaDepositoStatus)
        cadDepositoRoutes.get('/depositos', auth, listDepositos)
        cadDepositoRoutes.get('/depositos/:id', auth, listaDepositoId)
        cadDepositoRoutes.delete('/depositos/:id', auth, deleteDeposito)

        return cadUserRoutes
    }
}


module.exports = new CadUserRouter()