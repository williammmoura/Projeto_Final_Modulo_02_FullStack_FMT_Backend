/**
 * Regra de negócio do Cadastro de Depósito
 */
const { config } = require('dotenv');
const { CadDeposito, CadMedicamento } = require('../models/cadDepositos');
const jwt = require('jsonwebtoken');
config()

class CadDepositoController {
    // Criação de um novo deposito
    async criarDeposito(req, res) {
        try {
            // Obter o token JWT do cabeçalho da solicitação
            const token = req.headers.authorization;

            // Verificar se o token foi fornecido
            if (!token) {
                return res.status(401).send({
                    message: 'Token JWT não fornecido.'
                });
            }

            // Decodificar o token JWT para obter os dados do usuário, incluindo o usuario_id
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            console.log(decodedToken.id)

            // Extrair o usuario_id do token decodificado
            const usuario_id = decodedToken.usuario_id;

            // Extrair os dados do corpo da requisição
            const {
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone,
                celular,
                cep,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude,
                status,
            } = req.body;

            // Verificar se o CNPJ ou a Razão Social já foram cadastrados no sistema
            const depositoExistente = await CadDeposito.findOne({
                where: { cnpj },
            });

            // Cadastrar o depósito
            const deposito = await CadDeposito.create({
                usuario_id: decodedToken.id, // Usando o usuario_id obtido do token JWT
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone,
                celular,
                cep,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                complemento,
                latitude,
                longitude,
                status,
            });

            // Retornar os campos adicionais
            return res.status(201).send({
                id: deposito.id,
                razaoSocial: deposito.razao_social,
                identificador: deposito.usuario_id,
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: 'Erro ao cadastrar depósito.',
                cause: error.message
            });
        }
    }

    // Atualização dos Dados Depósitos
    async atualizarDeposito(req, res) {
        try {
            const { identificador } = req.params;
            const { 
                nome_fantasia, 
                email, 
                telefone, 
                celular, 
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                status} = req.body;

            // Verificar se o depósito com o identificador informado existe no sistema
            const deposito = await CadDeposito.findByPk(identificador);
            if (!deposito) {
                return res.status(404).send({
                    message: 'Depósito não encontrado.',
                    cause: error.message
                });
            }

            // Atualizar os campos do depósito com os valores informados no corpo da requisição
            if (nome_fantasia) {
                deposito.nome_fantasia = nome_fantasia;
            }
            if (email) {
                deposito.email = email;
            }
            if (telefone) {
                deposito.telefone = telefone;
            }
            if (celular) {
                deposito.celular = celular;
            }
            if (logradouro) {
                deposito.logradouro = logradouro;
            }
            if (numero) {
                deposito.numero = numero;
            }
            if (bairro) {
                deposito.bairro = bairro;
            }
            if (cidade) {
                deposito.cidade = cidade;
            }
            if (estado) {
                deposito.estado = estado;
            }
            if (status) {
                deposito.status = status;
            }

            // Salvar as alterações no banco de dados
            await deposito.save();

            // Retornar uma resposta de sucesso sem conteúdo (204 - No Content)
            return res.status(204).end();
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao atualizar os dados do depósito.',
                cause: error.message
            });
        }
    }

    // Atualização do Status do Depósito no Sistema
    async atualizarStatusDeposito(req, res) {
        try {
            const { identificador } = req.params;
            const { status } = req.body;

            // Verificar se o depósito com o identificador informado existe no sistema
            const deposito = await CadDeposito.findByPk(identificador);
            if (!deposito) {
                return res.status(404).send({
                    message: 'Depósito não encontrado.',
                    cause: error.message
                });
            }

            // Atualizar o status do depósito com o valor informado no corpo da requisição
            if (status) {
                deposito.status = status;
            }

            // Salvar as alterações no banco de dados
            await deposito.save();

            // Retornar uma resposta de sucesso sem conteúdo (204 - No Content)
            return res.status(204).end();
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao atualizar o status do depósito.',
                cause: error.message
            });
        }
    }

    // Listagem de Depósitos
    async listarDepositos(req, res) {
        try {
            const { status } = req.query;
            const whereClause = status ? { status } : {};

            const depositos = await CadDeposito.findAll({
                where: whereClause,
                attributes: { exclude: ['senha'] }, // Excluindo senha, se houver
            });

            return res.status(200).send(depositos);
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao listar os depósitos.',
                cause: error.message
            });
        }
    }

    // Listagem de Depósito pelo identificador
    async consultarDepositoPorId(req, res) {
        try {
            const { identificador } = req.params;

            // Consultar o depósito pelo identificador no banco de dados
            const deposito = await CadDeposito.findByPk(identificador);
            if (!deposito) {
                return res.status(404).send({
                    message: 'Depósito não encontrado.',
                    cause: error.message
                });
            }

            return res.status(200).send(deposito);
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao consultar o depósito.',
                cause: error.message
            });
        }
    }

    // Exclusão de Depósito
    async excluirDeposito(req, res) {
        try {
            const { identificador } = req.params;

            // Verificar se o depósito com o identificador informado existe no sistema
            const deposito = await CadDeposito.findByPk(identificador);
            if (!deposito) {
                return res.status(404).send({
                    message: 'Depósito não encontrado.',
                    cause: error.message
                });
            }

            // Verificar se o depósito possui medicamentos armazenados
            // (Essa verificação depende da implementação do modelo CadMedicamento)

            // Verificar se o depósito está com status 'Inativo'
            if (deposito.status !== 'Inativo') {
                return res.status(400).send({
                    message: 'O depósito deve estar com status "Inativo" para ser excluído.',
                    cause: error.message
                });
            }

            // Realizar a exclusão lógica do depósito
            // (Essa implementação pode variar de acordo com a estratégia de exclusão lógica do modelo)

            // Retornar uma resposta de sucesso sem conteúdo (204 - No Content)
            return res.status(204).end();
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao excluir o depósito.',
                cause: error.message
            });
        }
    }
}

module.exports = new CadDepositoController();
