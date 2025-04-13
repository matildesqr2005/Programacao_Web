const nota = require('../models/notaModel');


module.exports = (notas_info) => {
    const express = require('express');
    const router = express.Router();
const saveNotasToFile = () => {
    const filePath = path.join(__dirname, 'notas.txt');
    fs.writeFileSync(filePath, JSON.stringify(notas_info, null, 2));
};

    //a)
    router.get('/', (req, res) => {
        res.status(200).json(notas_info);
    })

    //b)
    router.get('/:cod', (req, res) => {
        let cod = parseInt(req.params.cod);
        let note = notas_info.find(n => n.cod === cod);
        
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ error: 'Disciplina não encontrada' });
        }
    })

    return router;
};