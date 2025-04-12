// Importar o módulo express
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Criar uma instância do aplicativo Express
const app = express();

// Definir a porta onde o servidor vai escutar
const port = 3000;

// Ex 2
let minhas_notas = [20, 10, 15, 17];
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
require("./Controllers/notas")(notas_info);
var notas = require("./Controllers/notas")(notas_info);
app.use('/notas', notas);

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

// Ex 3 - a) V
app.get('/', (req, res) => {
    res.status(200).json(notas);
})

// Ex - b) V
app.get('/:index', (req, res) => {
    let i = req.params.index;
    let size = notas.length;
    if(i > -1 && i < size){
        res.status(200).json(notas[i].nota);
        return;
    }

    res.status(400).json();
    throw "Invalid index";
})

// Ex - c) V
//por acabar
app.post('/', (req, res) => {
    let { nota } = req.body;
    let int = parseInt(nota);
    if (isNaN(int)){
        res.status(400).json(int);
        throw "Non integer value";
    }
    minhas_notas.push(int);
    res.send(minhas_notas);
})

//d)
//por acabar
app.post('/:valor', (req, res) => {
    let valor = parseInt(req.params.valor);
    if (isNaN(valor)){
        res.status(400).json({message: 'Valor não é um inteiro.'});
    }
    console.log(valor);
    minhas_notas.push(valor);
    return res.status(200).json(minhas_notas);
})

//e)
app.patch('/:valor', (req, res) => {
    let index = parseInt(req.params.valor);
    let { nota } = req.body;
    let notaInt = parseInt(nota);
    if( notas.length > index && index >=0 ){
        notas[index].nota = notaInt;
        return res.status(200).json(notas);
    }
    else
    return res.status(400).json({message: 'Index não existente.'});
});

//f)
app.delete('/:valor', (req, res) => {
    let int = parseInt(req.params.valor);
    if( notas.length > int && int >=0 ){
        notas.splice(int,1);
        return res.status(200).json(notas);
    } else 
        return res.status(400).json({message: 'Index não existente.'});
});

//g) V
app.delete('/', (req, res) => {
    notas.length = 0;
    return res.status(200).json(notas);
});

// Iniciar o servidor
app.listen(port, () => {
    // Ex 1
    console.log(`Servidor em http://localhost:${port}\nNomes: Matilde Sequeira, Alessandra Delgado, Ana Silva, Carolina Gegaloto`);
});
