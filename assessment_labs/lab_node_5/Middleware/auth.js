const jwt = require('jsonwebtoken');
const secretKey = 'secret_Key'

const verifyJwt = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json("Não foi fornecido um token");
    }

    jwt.verify (token, secretKey, (err, decoded) => {
        if(err){
            console.log("Erro de autenticação");
            return res.status(401).json("Token inválido");
        }

        req.user = decoded;
        next();
    });
}

module.exports = verifyJwt;