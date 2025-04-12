const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(minhas_notas);
})

router.get('/:index', (req, res) => {
    let i = req.params.index;
    let size = minhas_notas.length;
    if(i > -1 && i < size){
        res.status(200).json(minhas_notas[i]);
        return;
    }

    res.status(400).json();
    throw "Invalid index";
})

router.post('/', (req, res) => {
    let { nota } = req.body;
    let int = parseInt(nota);
    if (isNaN(int)){
        res.status(400).json(int);
        throw "Non integer value";
    }
    minhas_notas.push(int);
    res.send(minhas_notas);
})

router.post('/:valor', (req, res) => {
    let valor = parseInt(req.params.valor);
    if (isNaN(valor)){
        res.status(400).json({message: 'Valor não é um inteiro.'});
    }
    console.log(valor);
    minhas_notas.push(valor);
    return res.status(200).json(minhas_notas);
})

router.patch('/:valor', (req, res) => {
    let index = parseInt(req.params.valor);
    let { nota } = req.body;
    let notaInt = parseInt(nota);
    if( minhas_notas.length > index && index >=0 ){
        minhas_notas[index] = notaInt;
        return res.status(200).json(minhas_notas);
    }
    else
    return res.status(400).json({message: 'Index não existente.'});
});

router.delete('/:valor', (req, res) => {
    let int = parseInt(req.params.valor);
    if( minhas_notas.length > int && int >=0 ){
        minhas_notas.splice(int,1);
        return res.status(200).json(minhas_notas);
    } else 
        return res.status(400).json({message: 'Index não existente.'});
});

router.delete('/', (req, res) => {
    minhas_notas.length = 0;
    return res.status(200).json(minhas_notas);
});



module.exports = router;