const { createOneUser, loginUser, atualizaUsuario, atualizaStatus, atualizaSenha, listaUsuarioId } = require('../controllers/cadUser.controller')
const { Router } = require('express')

class CadUserRouter {
    routesFromCadUser(){
        const cadUserRoutes = Router()
        cadUserRoutes.post('/usuarios', createOneUser)
        cadUserRoutes.post('/usuarios/login', loginUser)
        cadUserRoutes.patch('/usuarios/:id', atualizaUsuario)
        cadUserRoutes.patch('/usuarios/:id/status', atualizaStatus)
        cadUserRoutes.patch('/usuarios/:id/senha', atualizaSenha)
        cadUserRoutes.get('/usuarios/:id', listaUsuarioId)

        return cadUserRoutes
    }
}


module.exports = new CadUserRouter()