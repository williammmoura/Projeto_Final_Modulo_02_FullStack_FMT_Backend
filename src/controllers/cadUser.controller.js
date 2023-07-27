/**
 * Regra de negócio do Cadastro de Usuários
 */
const { CadUsers } = require('../models/cadUsers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

class CadUserController {

    // Criar um Usuário
    async criarUsuario(req, res) {
        try {
            const { nome, sobrenome, cpf, email, senha, data_nascimento } = req.body;

            // Verificar se o CPF já foi cadastrado no sistema
            const usuarioExistente = await CadUsers.findOne({
                where: { cpf }
            });
            if (usuarioExistente) {
                return res.status(409).send({
                    message: 'CPF já cadastrado no sistema.',
                    cause: error.message
                });
            }

            // Cadastrar o usuário
            const usuario = await CadUsers.create({
                nome,
                sobrenome,
                cpf,
                email,
                senha,
                data_nascimento,
            });

            // Retornar os campos adicionais
            return res.status(201).send({
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                cpf: usuario.cpf,
                email: usuario.email,
                status: usuario.status,
                data_nascimento: usuario.data_nascimento,
                identificador: usuario.identificador,
            });
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao cadastrar usuário.',
                cause: error.message
            });
        }
    }

    // Login do Usuário
    async loginUsuario(req, res) {
        try {
            const { email, senha } = req.body;

            // Verificar se o e-mail do usuário existe no sistema
            const usuario = await CadUsers.findOne({
                where: { email }
            });
            if (!usuario) {
                return res.status(404).send({
                    message: 'E-mail não encontrado.',
                    cause: error.message
                });
            }

            // Verificar se a senha está correta
            if (usuario.senha !== senha) {
                return res.status(400).send({
                    message: 'Senha inválida.',
                    cause: error.message
                });
            }

            // Gerar o token de autenticação
            const payload = {
                id: usuario.id,
                email: usuario.email,
                name: usuario.name,
            }

            const token = sign(payload, process.env.SECRET, {
                expiresIn: '1d'
            })

            // Retornar o token
            return res.status(200).send({ token });
            } catch (error) {
            return res.status(400).send({
                message: 'Erro ao realizar login.',
                cause: error.message
            });
        }
    }

    // Atualização dos dados de Usuário
    async atualizarUsuario(req, res) {
        try {
            const { identificador } = req.params;
            const { nome, sobrenome, genero, telefone } = req.body;

            // Verificar se o usuário com o identificador informado existe no sistema
            const usuario = await CadUsers.findByPk(identificador);
            if (!usuario) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.',
                    cause: error.message
                });
            }

            // Atualizar os campos do usuário com os valores informados no corpo da requisição
            if (nome) {
                usuario.nome = nome;
            }
            if (sobrenome) {
                usuario.sobrenome = sobrenome;
            }
            if (genero) {
                usuario.genero = genero;
            }
            if (telefone) {
                usuario.telefone = telefone;
            }

            // Salvar as alterações no banco de dados
            await usuario.save();

            // Retornar os dados atualizados do usuário
            return res.status(204).send(usuario);
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao atualizar os dados do usuário',
                cause: error.message

            });
        }
    }

    // Atualizar Status do Usuário
    async atualizarStatusUsuario(req, res) {
        try {
            const { identificador } = req.params;
            const { status } = req.body;

            // Verificar se o usuário com o identificador informado existe no sistema
            const usuario = await CadUsers.findByPk(identificador);
            if (!usuario) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.',
                    cause: error.message
                });
            }

            // Atualizar o status do usuário com o valor informado no corpo da requisição
            if (status) {
                usuario.status = status;
            }

            // Salvar as alterações no banco de dados
            await usuario.save();

            // Retornar os dados atualizados do usuário
            return res.status(200).send(usuario);
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao atualizar o status do usuário.',
                cause: error.message
            });
        }
    }

    // Atualização de Senha do Usuário.
    async atualizarSenhaUsuario(req, res) {
        try {
            const { identificador } = req.params;
            const { senha } = req.body;

            // Verificar se o usuário com o identificador informado existe no sistema
            const usuario = await CadUsers.findByPk(identificador);
            if (!usuario) {
                return res.status(404).send({
                    message: 'Usuário não encontrado.',
                    cause: error.message
                });
            }

            // Atualizar a senha do usuário com o valor informado no corpo da requisição
            if (senha) {
                usuario.senha = senha;
            }

            // Salvar as alterações no banco de dados
            await usuario.save();

            // Retornar uma resposta de sucesso sem conteúdo (204 - No Content)
            return res.status(204).end();
        } catch (error) {
            return res.status(400).send({
                message: 'Erro ao atualizar a senha do usuário.',
                cause: error.message
            });
        }
    }

    // Listagem de Usuário pelo identificador
    async consultarUsuarioPorId(req, res) {
        try {
            const { identificador } = req.params;

            // Consultar o usuário pelo identificador no banco de dados
            const usuario = await CadUsers.findByPk(identificador, {
                attributes: { exclude: ['senha'] }, // Excluir o campo de senha do resultado da consulta
            });

            // Verificar se o usuário foi encontrado
            if (!usuario) {
                return res.status(404).send({
                    error: 'Usuário não encontrado.'
                });
            }

            // Retornar os dados do usuário no response
            return res.status(200).send(usuario);
        } catch (error) {
            return res.status(400).send({
                error: 'Erro ao consultar o usuário.'
            });
        }
    }
}

module.exports = new CadUserController()