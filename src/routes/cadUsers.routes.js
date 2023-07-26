const { criarUsuario, loginUsuario, atualizarUsuario, atualizarStatusUsuario, atualizarSenhaUsuario, consultarUsuarioPorId } = require('../controllers/cadUser.controller');
const { Router } = require('express');

class cadUsersRouter{
    routesFromCadUseers (){
        const cadUsersRoutes = Router()

        cadUsersRoutes.post('/usuarios', criarUsuario);
        cadUsersRoutes.post('/usuarios/login', loginUsuario);

        // Endpoints privados
        cadUsersRoutes.patch('/usuarios/:identificador', atualizarUsuario);
        cadUsersRoutes.patch('/usuarios/:identificador/status', atualizarStatusUsuario);
        cadUsersRoutes.patch('/usuarios/:identificador/senha', atualizarSenhaUsuario);
        cadUsersRoutes.get('/usuarios/:identificador', consultarUsuarioPorId);

        return cadUsersRoutes
    }    
}

module.exports = new cadUsersRouter();
