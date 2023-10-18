const { config } = require('dotenv')
const { verify } = require('jsonwebtoken')
config()

async function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers
        req["payload"] = verify(authorization, process.env.SECRET_JWT)
        console.log(req)
        next()
    } catch (error) {
        return res.status(401).send({
            message: 'Token JWT inválido ou expirado.',
            cause: error.message
        });
    }
}

module.exports = { authMiddleware };