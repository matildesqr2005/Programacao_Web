const express = require('express');
const router = express.Router();
const fs = require('fs');
const verify_jwt = require('../Middleware/auth');

// ! Using router.use(verify_jwt) would apply the auth middleware to every route registered after
// * But we can apply the auth middleware to this route only.
router.get('/:id',  verify_jwt, (req, res) => {
    const clientId = req.params.id;
    const filePath = __dirname + '/../data.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao ler o arquivo' 
            });
        }
        try { 
            const jsonData = JSON.parse(data);
            const cliente = jsonData.clientes.find( c => c.clienteId === clientId);

            if (!cliente) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Cliente não encontrado' 
                });
            }

            return res.json({ 
                success: true,
                data: cliente 
            });


        }catch (error) {
            console.error('Erro ao processar dados:', error);
            return res.status(500).json({ 
                success: false,
                error: 'Erro ao processar dados' 
            });
        }
    });
});

module.exports = router;
