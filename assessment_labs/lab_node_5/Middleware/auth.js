const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success: false,
            error: "Não foi fornecido um token"
        });
    }

    jwt.verify (token, 'accessSecret', (err, decoded) => {
        if(err){
            console.log("Erro de autenticação", err);
            return res.status(401).json({
                success: false,
                error: "Token inválido"
            });
        }

        req.user = decoded;
        next();
    });
}

module.exports = verifyJwt;