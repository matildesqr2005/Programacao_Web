

module.exports = (notas_info) => {
    const nota = require('../Models/nota');
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

    //c)
    router.post('/', (req, res) => {
        let { cod, nome_disc, nome_prof, nota } = req.body;
        let code_int = parseInt(cod);
        let int = parseInt(nota);
        if (isNaN(int)) {
            res.status(400).json(int);
            throw "Non integer value";
        }
        let notas = {
            cod: code_int,
            nome_disc: nome_disc,
            nome_prof: nome_prof,
            nota: int
        };
        notas_info.push(notas);
        res.send(notas_info);
    })

    //d)
    router.post('/:cod/:nome_disc/:nome_prof/:nota', (req, res) => {
        let  
        
    })

    return router;
};