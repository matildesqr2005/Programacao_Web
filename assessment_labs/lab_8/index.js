// Importar o módulo express
const express = require('express');
const cors = require('cors');

// Criar uma instância do aplicativo Express
const app = express();

// Definir a porta onde o servidor vai escutar
const port = 3000;

// Ex 2
let minhas_notas = [20,10,15,17];

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

// Ex 3 - a)
app.get('/', (req, res) => {
    res.status(201).json(minhas_notas);
})

// Ex - b)
app.get('/:index', (req, res) => {
    let i = req.params.index;
    let size = minhas_notas.length;
    if(i > -1 && i < size){
        res.status(200).json(minhas_notas[i]);
        return;
    }

    res.status(400).json();
    throw "Invalid index";
})

// Ex - c)
app.post('/:val', (req, res) => {
    let value = req.params.val;
    let int = parseInt(value);
    if (isNaN(int)){
        res.status(400).json(int);
        throw "Non integer value";
    }
    minhas_notas.push(int);
    res.send(minhas_notas);
})

// Iniciar o servidor
app.listen(port, () => {
    // Ex 1
    console.log(`Servidor em http://localhost:${port}\nNomes: Matilde Sequeira, Alessandra Delgado, Ana Silva, Carolina Gegaloto`);
});
