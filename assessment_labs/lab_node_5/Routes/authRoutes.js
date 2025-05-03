const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const secretKey = 'secret_Key'

router.use(express.json());

router.post('/login', (req, res) => {
    const { email, password} = req.body;

    
    try {
        const filePath = path.join(__dirname, '../data.json');
        const data = fs.readFileSync(filePath, 'utf8');
        const clientData = JSON.parse(data);
        
        const user = clientData.users.find( u => u.email === email && u.password === password);

        if (user) {
            const token = jwt.sign(
                {
                    userId: user.id, 
                    permissao: user.permissao
                },
                secretKey,
                { expiresIn: '30m' }
            );
            
            return res.json({ 
                success: true,
                token
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

module.exports = router;