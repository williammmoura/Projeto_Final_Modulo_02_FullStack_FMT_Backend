const { cadastrarMedicamento, atualizarMedicamento, listarMedicamentos, consultarMedicamentoPorId, excluirMedicamento } = require('../controllers/cadMedicamento.controller')
const { Router } = require('express')
const { authMiddleware } = require('../middlewares/authMiddleware')

class CadMedicamentosRouter {
    routesFromCadMedicamentos(){
        const cadMedicamentosRoutes = Router()

        cadMedicamentosRoutes.post('/medicamentos', authMiddleware, cadastrarMedicamento)
        cadMedicamentosRoutes.patch('/medicamentos/:identificador', authMiddleware, atualizarMedicamento)
        cadMedicamentosRoutes.get('/medicamentos/', authMiddleware, listarMedicamentos)
        cadMedicamentosRoutes.get('/medicamentos/:identificador', authMiddleware, consultarMedicamentoPorId)
        cadMedicamentosRoutes.delete('/medicamentos/:identificador', authMiddleware, excluirMedicamento)

        return cadMedicamentosRoutes
    }
}

module.exports = new CadMedicamentosRouter()