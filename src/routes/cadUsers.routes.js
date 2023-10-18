const { criarUsuario, loginUsuario, atualizarUsuario, atualizarStatusUsuario, atualizarSenhaUsuario, consultarUsuarioPorId } = require('../controllers/cadUser.controller');
const { Router } = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware')

class CadUsersRouter{
    routesFromCadUseers (){
        const cadUsersRoutes = Router()

        cadUsersRoutes.post('/usuarios', criarUsuario); /* #swagger.tags = ['User'] */
        /* #swagger.description = 'Endpoint para criar um usuário.' */
        cadUsersRoutes.post('/usuarios/login', loginUsuario); /* #swagger.tags = ['User'] */
        /* #swagger.description = 'Endpoint para fazer login do usuário.' */

        // Endpoints privados
        cadUsersRoutes.patch('/usuarios/:id', authMiddleware, atualizarUsuario); /* #swagger.tags = ['User'] */
        /* #swagger.description = 'Endpoint para atualizar dados de um usuário.' */
        cadUsersRoutes.patch('/usuarios/:id/status', authMiddleware, atualizarStatusUsuario); /* #swagger.tags = ['User'] */
        /* #swagger.description = 'Endpoint para atualizar o status de um usuário.' */
        cadUsersRoutes.patch('/usuarios/:id/senha', authMiddleware, atualizarSenhaUsuario); /* #swagger.tags = ['User'] */
        /* #swagger.description = 'Endpoint para atualizar a senha de um usuário.' */
        cadUsersRoutes.get('/usuarios/:id', authMiddleware, consultarUsuarioPorId); /* #swagger.tags = ['User'] */
        /* #swagger.description = 'Endpoint para consultar um usuário através do ser ID.' */

        return cadUsersRoutes
    }    
}

module.exports = new CadUsersRouter();
