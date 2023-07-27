/**
 * Regra de negócio do Cadastro de Medicamentos
 */
const { CadMedicamento } = require('../models/cadMedicamentos');

class CadMedicamentoController {
    // Cadastro de Medicamento
    async cadastrarMedicamento(req, res) {
        try {
            const {
                identificadorUsuario,
                identificadorDeposito,
                nomeMedicamento,
                nomeLaboratorio,
                descricao,
                dosagem,
                unidadeDosagem,
                tipo,
                precoUnitario,
                quantidade
            } = req.body;

            // Verificar se o nome do medicamento já foi cadastrado no sistema
            const medicamentoExistente = await CadMedicamento.findOne({
                where: { nomeMedicamento }
            });
            if (medicamentoExistente) {
                return res.status(409).send({
                    error: 'Nome de medicamento já cadastrado no sistema.'
                });
            }

            // Cadastrar o medicamento
            const medicamento = await CadMedicamento.create({
                identificadorUsuario,
                identificadorDeposito,
                nomeMedicamento,
                nomeLaboratorio,
                descricao,
                dosagem,
                unidadeDosagem,
                tipo,
                precoUnitario,
                quantidade
            });

            // Retornar os campos adicionais
            return res.status(201).send({
                id: medicamento.id,
                nomeMedicamento: medicamento.nomeMedicamento,
                identificador: medicamento.identificador,
            });
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao cadastrar medicamento.'
            });
        }
    }

    // Atualização dos dados do Medicamento
    async atualizarMedicamento(req, res) {
        try {
            const { identificador } = req.params;
            const { descricao, precoUnitario, quantidade } = req.body;

            // Verificar se o medicamento com o identificador informado existe no sistema
            const medicamento = await CadMedicamento.findByPk(identificador);
            if (!medicamento) {
                return res.status(404).send({
                    error: 'Medicamento não encontrado.'
                });
            }

            // Atualizar os campos do medicamento com os valores informados no corpo da requisição
            if (descricao) {
                medicamento.descricao = descricao;
            }
            if (precoUnitario) {
                medicamento.precoUnitario = precoUnitario;
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
                error: 'Erro ao atualizar os dados do medicamento.'
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
            });
        }
    }

    // Listagem de Medicamento pelo identificador
    async consultarMedicamentoPorId(req, res) {
        try {
            const { identificador } = req.params;

            // Consultar o medicamento pelo identificador no banco de dados
            const medicamento = await CadMedicamento.findByPk(identificador);
            if (!medicamento) {
                return res.status(404).send({
                    error: 'Medicamento não encontrado.',
                });
            }

            return res.status(200).send(medicamento);
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao consultar o medicamento.',
            });
        }
    }

    // Exclusão de Medicamento
    async excluirMedicamento(req, res) {
        try {
            const { identificador } = req.params;

            // Verificar se o medicamento com o identificador informado existe no sistema
            const medicamento = await CadMedicamento.findByPk(identificador);
            if (!medicamento) {
                return res.status(404).send({
                    error: 'Medicamento não encontrado.',
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
            });
        }
    }
}

module.exports = new CadMedicamentoController();
