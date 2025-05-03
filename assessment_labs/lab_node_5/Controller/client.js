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
            return res.status(500).json({ error: 'Erro ao ler o arquivo' });
        }
        const jsonData = JSON.parse(data);
        if (jsonData.clienteId === clientId) {
            return res.status(200).json(jsonData);
        } else {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
    });
});

module.exports = router;
