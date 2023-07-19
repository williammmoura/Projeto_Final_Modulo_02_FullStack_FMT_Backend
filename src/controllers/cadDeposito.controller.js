/**
 * Regra de negócio do Cadastro de Depósito
 */
const { CadDeposito } = require('../models/cadDeposito');

class CadDepositoController {
    async createOneDeposito(req, res) {
        try {
            const {
                usuario_responsavel,
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone,
                celular,
                cep,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude
            } = req.body;

            // Validar os campos obrigatórios:
            if (!usuario_responsavel ||
                !razao_social ||
                !cnpj ||
                !nome_fantasia ||
                !email ||
                !celular ||
                !cep ||
                !endereco ||
                !numero ||
                !bairro ||
                !cidade ||
                !estado) {
                return res.status(400).send({
                    error: "Todos os campos obrigatórios devem ser preenchidos."
                });
            }

            // Verificar se o CNPJ já está cadastrado no banco de dados:
            const existeDeposito = await CadDeposito.findOne({
                where: { cnpj }
            });
            if (existeDeposito) {
                return res.status(409).send({
                    error: "Este CNPJ já está cadastrado.",
                    cause: "O CNPJ informado já existe no sistema."
                });
            }

            // Verificar se a Razão Social já está cadastrada no banco de dados:
            const existeRazaoSocial = await CadDeposito.findOne({
                where: { razao_social }
            });
            if (existeRazaoSocial) {
                return res.status(409).send({
                    error: "Esta Razão Social já está cadastrada.",
                    cause: "A Razão Social informada já existe no sistema."
                });
            }

            // Criar um novo depósito no banco de dados:
            const newCadDeposito = await CadDeposito.create({
                usuario_responsavel,
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone,
                celular,
                cep,
                endereco,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude
            });

            // Retornar a resposta de sucesso
            return res.status(201).send(newCadDeposito);
        } catch (error) {
            return res.status(500).send({
                error: "Erro ao criar o depósito.",
                cause: error.message
            });
        }
    }

    // Atualização dos Dados Depósitos
    async atualizaDeposito(req, res) {
        try {
            const { id } = req.params;
            const {
                nomeFantasia,
                email,
                telefone,
                celular,
                endereco
            } = req.body;

            // Verificar se o depósito existe no banco de dados
            const deposito = await CadDeposito.findByPk(id);
            if (!deposito) {
                return res.status(404).json({
                    error: "Depósito não encontrado."
                });
            }

            // Atualizar os dados do depósito
            deposito.nomeFantasia = nomeFantasia;
            deposito.email = email;
            deposito.telefone = telefone;
            deposito.celular = celular;
            deposito.endereco = endereco;

            // Salvar as alterações no banco de dados
            await deposito.save();

            // Retornar resposta de sucesso
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao atualizar o depósito.",
                cause: error.message
            });
        }
    }

    // Atualização do Status do Depósito no Sistema
    async atualizaDepositoStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // Verificar se o depósito existe no banco de dados
            const deposito = await CadDeposito.findByPk(id);
            if (!deposito) {
                return res.status(404).json({
                    error: "Depósito não encontrado."
                });
            }

            // Atualizar o status do depósito
            deposito.status = status;

            // Salvar as alterações no banco de dados
            await deposito.save();

            // Retornar resposta de sucesso
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao atualizar o status do depósito.",
                cause: error.message
            });
        }
    }

    // Listagem de Depósitos
    async listDepositos(req, res) {
        try {
            const { status } = req.query;

            let whereCondition = {};
            if (status) {
                whereCondition.status = status.toUpperCase();
            }

            const depositos = await CadDeposito.findAll({
                where: whereCondition
            });

            return res.status(200).send(depositos);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar os depósitos.",
                cause: error.message
            });
        }
    }

    // Listagem de Depósito pelo identificador
    async listaDepositoId(req, res) {
        try {
            const { id } = req.params;

            const deposito = await CadDeposito.findOne({
                where: { id: id }
            });

            if (!deposito) {
                return res.status(404).json({
                    error: "Depósito não encontrado."
                });
            }

            return res.status(200).send(deposito);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao consultar o depósito.",
                cause: error.message
            });
        }
    }

    // Exclusão de Depósito
    async deleteDeposito(req, res) {
        try {
            const { identificador } = req.params;

            // Verificar se o depósito existe
            const deposito = await CadDeposito.findByPk(identificador);
            if (!deposito) {
                return res.status(404).json({
                    error: "Depósito não encontrado."
                });
            }

            // Verificar se existem medicamentos armazenados no depósito
            const medicamentos = await CadMedicamento.findAll({
                where: { deposito_id: identificador }
            });
            if (medicamentos.length > 0) {
                return res.status(400).json({
                    error: "Não é possível excluir o depósito. Existem medicamentos armazenados nele."
                });
            }

            // Verificar se o depósito está inativo
            if (deposito.status !== 'Inativo') {
                return res.status(400).json({
                    error: "Não é possível excluir o depósito. O status deve estar 'Inativo'."
                });
            }

            // Realizar a exclusão lógica do depósito
            await deposito.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao excluir o depósito.",
                cause: error.message
            });
        }
    }

}

module.exports = new CadDepositoController();
