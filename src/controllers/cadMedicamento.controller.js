/**
 * Regra de negócio do Cadastro de Medicamentos
 */
const { CadMedicamento } = require('../models/cadMedicamentos');

class CadMedicamentoController {
    // Cadastro de Medicamento
    async cadastrarMedicamento(req, res) {
        try {
            const {
                usuario_id,
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

            // Verificar se o nome_medicamento já está cadastrado no sistema
            const medicamentoExistente = await CadMedicamento.findOne({
                where: { nome_medicamento },
            });

            if (medicamentoExistente) {
                return res.status(409).json({
                    error: 'Nome de medicamento já cadastrado.' 
                });
            }

            // Criar o novo medicamento no banco de dados
            const novoMedicamento = await CadMedicamento.create({
                usuario_id,
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

            // Responder com sucesso (HTTP Status Code 201 - Created)
            return res.status(201).json({
                id: novoMedicamento.id,
                usuario_id: novoMedicamento.usuario_id,
                deposito_id: novoMedicamento.deposito_id,
                nomeMedicamento: novoMedicamento.nome_medicamento,
                nome_laboratorio: novoMedicamento.nome_laboratorio,
                descricao: novoMedicamento.descricao,
                dosagem: novoMedicamento.dosagem,
                unidade_dosagem: novoMedicamento.unidade_dosagem,
                tipo: novoMedicamento.tipo,
                preco_unitario: novoMedicamento.preco_unitario,
                quantidade: novoMedicamento.quantidade
            });
        } catch (error) {
            return res.status(400).json({
                message: "Erro ao cadastrar o medicamento",
                cause: error.message
            })
        }
    }

    // Atualização dos dados do Medicamento
    async atualizarMedicamento(req, res) {
        try {
            const { id } = req.params;
            const { descricao, preco_unitario, quantidade } = req.body;

            // Verificar se o medicamento com o id informado existe no sistema
            const medicamento = await CadMedicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).send({
                    error: 'Medicamento não encontrado.',
                    cause: error.message
                });
            }

            // Atualizar os campos do medicamento com os valores informados no corpo da requisição
            if (descricao) {
                medicamento.descricao = descricao;
            }
            if (preco_unitario) {
                medicamento.preco_unitario = preco_unitario;
            }
            if (quantidade) {
                medicamento.quantidade = quantidade;
            }

            // Salvar as alterações no banco de dados
            await medicamento.save();

            // Retornar os dados atualizados do medicamento
            return res.status(200).send(medicamento);
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao atualizar os dados do medicamento.',
                cause: error.message
            });
        }
    }

    // Listagem de Medicamentos
    async listarMedicamentos(req, res) {
        try {
            const { tipo } = req.query;
            const whereClause = tipo ? { tipo } : {};

            const medicamentos = await CadMedicamento.findAll({
                where: whereClause,
            });

            return res.status(200).send(medicamentos);
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao listar os medicamentos.',
                cause: error.message
            });
        }
    }

    // Listagem de Medicamento pelo id
    async consultarMedicamentoPorId(req, res) {
        try {
            const { id } = req.params;

            // Consultar o medicamento pelo id no banco de dados
            const medicamento = await CadMedicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).send({
                    error: 'Medicamento não encontrado.',
                    cause: error.message
                });
            }

            return res.status(200).send(medicamento);
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao consultar o medicamento.',
                cause: error.message
            });
        }
    }

    // Exclusão de Medicamento
    async excluirMedicamento(req, res) {
        try {
            const { id } = req.params;

            // Verificar se o medicamento com o id informado existe no sistema
            const medicamento = await CadMedicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).send({
                    error: 'Medicamento não encontrado.',
                    cause: error.message
                });
            }

            // Realizar a exclusão lógica do medicamento
            medicamento.ativo = false;

            // Salvar as alterações no banco de dados
            await medicamento.save();

            // Retornar uma resposta de sucesso sem conteúdo (204 - No Content)
            return res.status(204).end();
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao excluir o medicamento.',
                cause: error.message
            });
        }
    }
}

module.exports = new CadMedicamentoController();
