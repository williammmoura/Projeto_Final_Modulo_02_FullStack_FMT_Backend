const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Obter o token JWT do cabeçalho da solicitação
    const token = req.headers.authorization;

    // Verificar se o token foi fornecido
    if (!token) {
        return res.status(401).send({
            message: 'Token JWT não fornecido.',
        });
    }

    try {
        // Verificar se o token JWT é válido e decodificá-lo para obter os dados do usuário
        const decodedToken = jwt.verify(token.replace('sci1909', ''), process.env.JWT_SECRET);

        // Adicionar os dados do usuário decodificado ao objeto de solicitação (req)
        req.userData = decodedToken;

        // Chamar o próximo middleware ou a rota real
        next();
    } catch (error) {
        return res.status(401).send({
            message: 'Token JWT inválido ou expirado.',
        });
    }
}

module.exports = authMiddleware;


