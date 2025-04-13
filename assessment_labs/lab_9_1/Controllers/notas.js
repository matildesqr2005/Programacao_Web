const express = require('express');
const fs = require('fs');
const path = require('path');
const nota = require('../models/notaModel');

const router = express.Router();

let notas_info = [
    {
        cod: 0,
        nome_disc: "Programação",
        nome_prof: "Nuno",
        nota: 20,
    },

    {
        cod: 1,
        nome_disc: "Programação",
        nome_prof: "Onun",
        nota: 10,
    },

    {
        cod: 2,
        nome_disc: "Programação",
        nome_prof: "Nnou",
        nota: 15,
    }
]

const saveNotasToFile = () => {
    const filePath = path.join(__dirname, 'notas.txt');
    fs.writeFileSync(filePath, JSON.stringify(notas_info, null, 2));
};

router.get('/notas', (req, res) => {
    return res.status(200).json(notas_info);
})

router.get('/notas/:index', (req, res) => {
    let i = req.params.index;
    let size = minhas_notas.length;
    if(i > -1 && i < size){
        res.status(200).json(minhas_notas[i]);
        return;
    }

    res.status(400).json();
    throw "Invalid index";
})

router.post('/notas', (req, res) => {
    let { nota } = req.body;
    let int = parseInt(nota);
    if (isNaN(int)){
        res.status(400).json(int);
        throw "Non integer value";
    }
    minhas_notas.push(int);
    saveNotasToFile();
    res.send(minhas_notas);
})

router.post('/notas/:valor', (req, res) => {
    let valor = parseInt(req.params.valor);
    if (isNaN(valor)){
        res.status(400).json({message: 'Valor não é um inteiro.'});
    }
    console.log(valor);
    minhas_notas.push(valor);
    saveNotasToFile();
    return res.status(200).json(minhas_notas);
})

router.patch('/notas/:valor', (req, res) => {
    let index = parseInt(req.params.valor);
    let { nota } = req.body;
    let notaInt = parseInt(nota);
    if( minhas_notas.length > index && index >=0 ){
        minhas_notas[index] = notaInt;
        saveNotasToFile();
        return res.status(200).json(minhas_notas);
    }
    else
    return res.status(400).json({message: 'Index não existente.'});
});

router.delete('/notas/:valor', (req, res) => {
    let int = parseInt(req.params.valor);
    if( minhas_notas.length > int && int >=0 ){
        minhas_notas.splice(int,1);
        return res.status(200).json(minhas_notas);
    } else 
        return res.status(400).json({message: 'Index não existente.'});
});

router.delete('/notas', (req, res) => {
    minhas_notas.length = 0;
    return res.status(200).json(minhas_notas);
});



module.exports = router;