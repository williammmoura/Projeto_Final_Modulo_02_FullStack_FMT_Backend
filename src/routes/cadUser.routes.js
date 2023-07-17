const { createOneUser } = require('../controllers/cadUser.controller')
const { Router } = require('express')

class CadUserRouter {
    routesFromCadUser(){
        const cadUserRoutes = Router()
        cadUserRoutes.post('/createOneUser', createOneUser)
        //cadUserRoutes.post('/creaOneUser', createOneUser) -> Exemplo de uma segunda rota.

        return cadUserRoutes
    }
}


module.exports = new CadUserRouter()