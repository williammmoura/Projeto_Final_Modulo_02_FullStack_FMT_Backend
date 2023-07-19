/**
 * Regra de negócio do Cadastro de Usuários
 */
const { CadUser } = require('../models/cadUser');
const { sign } = require('jsonwebtoken');

class CadUserController {

    // Criar um Usuário
    async createOneUser(req, res) {
        try {
            const {
                nome,
                sobrenome,
                genero,
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha
            } = req.body;

            // Validar os campos obrigatórios:
            if (!nome || !sobrenome || !cpf || !email || !senha) {
                return res.status(400).send({
                    error: "Todos os campos obrigatórios devem ser preenchidos."
                });
            }

            // Verificar se o CPF já está cadastrado no banco de dados:
            const existeUser = await CadUser.findOne({
                where: { cpf }
            });
            if (existeUser) {
                return res.status(409).send({
                    error: "Este CPF já está cadastrado."
                });
            }

            // Criar um novo usuário no banco de dados:
            const newCadUser = await CadUser.create({
                nome,
                sobrenome,
                genero,
                dt_nascimento,
                cpf,
                telefone,
                email,
                senha,
                status: 'Ativo'
            });

            //Retorna a resposta de sucesso.
            return res.status(201).send({ newCadUser })
        } catch (error) {
            return res.status(500).send({
                "message": "Erro ao criar o usuário.",
                "cause": error.message
            });
        }
    }

    // Login do Usuário
    async loginUser(req, res) {
        try {
            const { email, senha } = req.body;

            // Verificando se o e-mail e senha foram fornecidos
            if (!email || !senha) {
                return res.status(400).send({
                    error: "O e-mail e senha são obrigatórios."
                })
            }

            // Buscar o usuário pelo e-mail
            const usuario = await CadUser.findOne({
                where: { email }
            })

            // Verificar se o usuário existe
            if (!usuario) {
                return res.status(404).send({
                    error: "O e-mail não está cadastrado."
                })
            }

            // Verificar se a senha está correta
            if (senha !== usuario.senha) {
                return res.status(400).send({
                    error: "A senha está incorreta"
                })
            }

            const payload = {
                email: existeUser.email,
                nome: existeUser.nome
            }

            // Gerar o token de autenticação
            const token = sign(payload, process.env.SECRET, {
                expiresIn: '1d'
            })

            return res.status(200).send({ token })
        } catch (error) {
            return res.status(404).send({
                message: error.message
            })
        }
    }

    // Atualização dos dados de Usuário
    async atualizaUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, sobrenome, genero, telefone } = req.body;

            // Verificar se o usuário exeste
            const usuario = await CadUser.findByPk(id);
            if (!usuario) {
                return res.status(404).send({
                    error: "Usuário não encontrados."
                });
            }

            // Atualizar os campos permitidos
            if (nome) usuario.nome = nome;
            if (sobrenome) usuario.sobrenome = sobrenome;
            if (genero) usuario.genero = genero;
            if (telefone) usuario.telefone = telefone;

            // Salvar as alterações no banco de dados
            await usuario.save();

            // Retorna a respesta de sucesso
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({
                error: "Erro ao atualizar os dados do usuário.",
                cause: error.message
            });
        }
    }

    // Atualizar Status do Usuário
    async atualizaStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // Verificar se o usuário existe
            const usuario = await CadUser.findByPk(id);
            if (!usuario) {
                return res.status(404).send({
                    error: "Usuário não encontrado."
                });
            }

            // Atualizar o status
            usuario.status = status;

            // Salvar as alterações no banco de dados.
            await usuario.save();

            // Retorna a resposta de sucesso com os dados atualizados do usuário.
            return res.status(200).send(usuario);
        } catch (error) {
            return res.status(400).send({
                error: "Erro ao atualizar o status do usuário.",
                cause: error.message
            });
        }
    }

    // Atualização de Senha do Usuário.
    async atualizaSenha(req, res) {
        try {
            const { id } = req.params;
            const { senha } = req.body;

            // Verificar se o usuário existe
            const usuario = await CadUser.findByPk(id);
            if (!usuario) {
                return res.status(404).send({
                    error: "Usuário não encontrado."
                });
            }

            // Atualizar a senha do usuário
            usuario.senha = senha;

            // Salvar as alterações no banco de dados
            await usuario.save();

            // Retorna a resposta de sucesso
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({
                error: "Erro ao atualizar a senha do usuário.",
                cause: error.message
            });
        }
    }

    // Listagem de Usuário pelo identificador
    async listaUsuarioId(req, res) {
        try {
            const { id } = req.params;

            // Buscar o usuário pelo identificador
            const usuario = await CadUser.findByPk(id, {
                attributes: { exclude: ['senha'] } // Excluir o campo "senha" da resposta
            });

            // Verificar se o usuário existe
            if (!usuario) {
                return res.status(404).send({
                    error: "Usuário não encontrado."
                });
            }

            // Retorna os dados do usuário
            return res.status(200).send(usuario);
        } catch (error) {
            return res.status(500).send({
                error: "Erro ao buscar o usuário.",
                cause: error.message
            });
        }
    }
}

module.exports = new CadUserController()