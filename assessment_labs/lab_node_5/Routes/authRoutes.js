const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const secretKey = 'secret_Key'

router.use(express.json());

router.post('/login', (req, res) => {
    const { email, password } = req.body;


    try {
        const filePath = path.join(__dirname, '../data.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const clientData = JSON.parse(data);

        const user = clientData.users.find(u => u.email === email && u.password === password);

        if (user) {
            const accessToken = jwt.sign(
                { userId: user.id, permissao: user.permissao },
                'accessSecret',
                { expiresIn: '15m' }
            );

            //doesnt need to have the permission because
            //is only used to verify the identity of the user
            const refreshToken = jwt.sign(
                { userId: user.id },
                'refreshSecret',
                { expiresIn: '7d' }
            );

            // send refersh token to server
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true, 
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({
                success: true,
                accessToken
            });
        }

        res.status(401).json({
            sucess: false,
            error: "Credenciais inválidas"
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            sucess: false,
            error: "Erro no servidor"
        });
    }
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json("Não foi fornecido o token");
    }

    jwt.verify(refreshToken, 'refreshSecret', (err, decoded) => {
        if(err){
            return res.status(401).json("Token inválido");
        }

        const accessToken = jwt.sign(
            { userId: decoded.userId, permissao: decoded.permissao },
            'accessSecret',  
            { expiresIn: '15m' }  
        );

        res.json(accessToken);
    })
})


module.exports = router;