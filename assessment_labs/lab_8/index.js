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
    if(i > -1 && i < size)
        res.status(200).json(minhas_notas[i]);

    res.status(400).json();
})

// Ex - c)
app.post('/:val', (req, res) => {
    let value = req.params.val;
    let int = parseInt(value);
    if (isNaN(int)){
        res.status(400).send("O valor inserido deve ser um inteiro.");
        return;
    }
    minhas_notas.push(int);
    console.log(minhas_notas);
    res.send();
})

// Iniciar o servidor
app.listen(port, () => {
    // Ex 1
    console.log(`Servidor em http://localhost:${port},\nNomes: Matilde Sequeira, Alessandra Delgado, Ana Silva, Carolina Gegaloto`);
});
