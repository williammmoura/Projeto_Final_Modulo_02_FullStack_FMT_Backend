/**
 * Regra de negócio do Cadastro de Medicamentos
 */
const { CadMedicamento } = require('../models/cadMedicamento');

class CadMedicamentoController {
    async createOneMedicamento(req, res) {
        try {
            const {
                usuario_responsavel,
                deposito_id,
                nome_medicamento,
                nome_laboratorio,
                descricao,
                dosagem,
                unidade_dosagem,
                tipo,
                preco_unitario,
                quantidade
            } = req.body;

            // Validar os campos obrigatórios:
            if (!usuario_responsavel || 
                !deposito_id || 
                !nome_medicamento || 
                !nome_laboratorio || 
                !dosagem || 
                !unidade_dosagem || 
                !tipo || 
                !preco_unitario || 
                !quantidade) {
                return res.status(400).send({
                    error: "Todos os campos obrigatórios devem ser preenchidos."
                });
            }

            // Verificar se o nome do medicamento já está cadastrado no banco de dados:
            const existeMedicamento = await CadMedicamento.findOne({
                where: { nome_medicamento }
            });
            if (existeMedicamento) {
                return res.status(409).send({
                    error: "Este medicamento já está cadastrado.",
                    cause: "O nome do medicamento informado já existe no sistema."
                });
            }

            // Criar um novo medicamento no banco de dados:
            const newCadMedicamento = await CadMedicamento.create({
                usuario_responsavel,
                deposito_id,
                nome_medicamento,
                nome_laboratorio,
                descricao,
                dosagem,
                unidade_dosagem,
                tipo,
                preco_unitario,
                quantidade
            });

            // Retornar a resposta de sucesso
            return res.status(201).send(newCadMedicamento);
        } catch (error) {
            return res.status(500).send({
                error: "Erro ao criar o medicamento.",
                cause: error.message
            });
        }
    }

    // Atualização dos dados do Medicamento
    async atualizaMedicamento(req, res) {
        try {
            const { id } = req.params;
            const { descricao, preco_unitario, quantidade } = req.body;

            // Verificar se o medicamento existe no banco de dados
            const medicamento = await CadMedicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).send({
                    error: "Medicamento não encontrado.",
                    cause: "O identificador do medicamento não existe no sistema."
                });
            }

            // Atualizar os campos do medicamento
            medicamento.descricao = descricao;
            medicamento.preco_unitario = preco_unitario;
            medicamento.quantidade = quantidade;

            // Salvar as alterações no banco de dados
            await medicamento.save();

            // Retornar a resposta de sucesso
            return res.status(200).send(medicamento);
        } catch (error) {
            return res.status(400).send({
                error: "Erro ao atualizar o medicamento.",
                cause: error.message
            });
        }
    }

    // Listagem de Medicamentos
    async listMedicamento(req, res) {
        try {
            const { tipo } = req.query;

            // Construir o filtro para a consulta
            const filtro = tipo ? { tipo } : {};

            // Realizar a consulta dos medicamentos
            const medicamentos = await CadMedicamento.findAll({ where: filtro });

            // Retornar a lista de medicamentos
            return res.status(200).send(medicamentos);
        } catch (error) {
            return res.status(500).send({
                error: "Erro ao listar os medicamentos.",
                cause: error.message
            });
        }
    }

    // Listagem de Medicamento pelo identificador
    async listaMedicamentoId(req, res) {
        try {
            const { id } = req.params;

            // Consultar o medicamento pelo identificador
            const medicamento = await CadMedicamento.findByPk(id);

            // Verificar se o medicamento existe
            if (!medicamento) {
                return res.status(404).send({
                    error: "Medicamento não encontrado."
                });
            }

            // Retornar os dados do medicamento
            return res.status(200).send(medicamento);
        } catch (error) {
            return res.status(500).send({
                error: "Erro ao buscar o medicamento.",
                cause: error.message
            });
        }
    }

    // Exclusão de Medicamento
    async deleteMedicamento(req, res) {
        try {
            const { identificador } = req.params;

            // Consultar o medicamento pelo identificador
            const medicamento = await CadMedicamento.findByPk(identificador);

            // Verificar se o medicamento existe
            if (!medicamento) {
                return res.status(404).send({
                    error: "Medicamento não encontrado."
                });
            }

            // Excluir o medicamento (exclusão lógica)
            await medicamento.destroy();

            // Retornar o status 204 (No Content)
            return res.status(204).end();
        } catch (error) {
            return res.status(500).send({
                error: "Erro ao excluir o medicamento.",
                cause: error.message
            });
        }
    }
}

module.exports = new CadMedicamentoController();
