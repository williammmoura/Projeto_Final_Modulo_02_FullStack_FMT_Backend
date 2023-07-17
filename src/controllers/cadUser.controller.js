/**
 * Regra de negócio do Cadastro de Usuários
 */
const { CadUser } = require('../models/cadUser')

class CadUserController {
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
                return res.status(400).json({
                    error: "Todos os campos obrigatórios devem ser preenchidos."
                });
            }

            // Verificar se o CPF já está cadastrado no banco de dados:
            const existeUser = await CadUser.findOne({
                where: { cpf }
            });
            if (existeUser) {
                return res.status(409).json({
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
        } catch (error){
            return res.status(500).json({
                error: "Erro ao criar o usuário."
            });
        }
    }
}

module.exports = new CadUserController()