const express = require('express');
const router = express.Router();
const client = require('../Models/client');
const path = require('path');
const fs = require('fs');

router.get('/:id', (req, res) => {
    const clientId = req.params.id;
    const filePath = path.join(__dirname, 'data.json');

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
