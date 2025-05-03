const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretkey = 'secret_key'; 

// exemples
const users = [
    {
        id: 1,
        nome: "Marcia",
        email: "marcia@example.com",
        password: "123"
    },
    {
        id: 2,
        nome: "Luisa",
        email: "luisa@example.com",
        password: "890" 
    }
]

// endpoint
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    const user = users.find( u => u.email === email && u.password === password);

    if (!user){
        return res.status(401).json({
            error: "Credenciais inválidas"
        });
    }

    // create token JWT
    const token = jwt.sign (
        {
            id: user.id, 
            nome: user.nome,
            email: user.email
        },
        secretkey
    );

    // return token
    res.status(200).json({
        token
    });
});

module.exports = router;