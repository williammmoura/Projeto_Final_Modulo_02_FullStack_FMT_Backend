const { createOneMedicamento, atualizaMedicamento, listMedicamento, listaMedicamentoId, deleteMedicamento } = require('../controllers/cadMedicamento.controller')
const { Router } = require('express')

class CadMedicamentoRouter {
    routesFromCadMedicamento(){
        const cadMedicamentoRoutes = Router()
        cadMedicamentoRoutes.post('/medicamentos', auth, createOneMedicamento)
        cadMedicamentoRoutes.patch('/medicamentos/:id', auth, atualizaMedicamento)
        cadMedicamentoRoutes.get('/medicamentos/', auth, listMedicamento)
        cadMedicamentoRoutes.get('/medicamentos/:id', auth,listaMedicamentoId)
        cadMedicamentoRoutes.delete('/medicamentos/:id', auth,deleteMedicamento)

        return cadMedicamentoRoutes
    }
}


module.exports = new CadMedicamentoRouter()