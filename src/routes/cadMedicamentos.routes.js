const { cadastrarMedicamento, atualizarMedicamento, listarMedicamentos, consultarMedicamentoPorId, excluirMedicamento } = require('../controllers/cadMedicamento.controller')
const { Router } = require('express')

class CadMedicamentosRouter {
    routesFromCadMedicamentos(){
        const cadMedicamentosRoutes = Router()

        cadMedicamentosRoutes.post('/medicamentos', cadastrarMedicamento)
        cadMedicamentosRoutes.patch('/medicamentos/:identificador', atualizarMedicamento)
        cadMedicamentosRoutes.get('/medicamentos/', listarMedicamentos)
        cadMedicamentosRoutes.get('/medicamentos/:identificador', consultarMedicamentoPorId)
        cadMedicamentosRoutes.delete('/medicamentos/:identificador', excluirMedicamento)

        return cadMedicamentosRoutes
    }
}

module.exports = new CadMedicamentosRouter()