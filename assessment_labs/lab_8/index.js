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
    console.log(minhas_notas);
    res.send();
})

//d)
app.post('/:valor', (req, res) => {
    console.log(req.params.valor);
    minhas_notas.push(req.params.valor);
    return res.send("Valor recebido: " + req.params.valor);
})

//e)
app.patch('/:valor', (req, res) => {
    minhas_notas[req.params.valor] = req.body.nota;
    console.log(minhas_notas[req.params.valor]);
    return res.send("Valor mudado.");
});

//f)
app.delete(':valor', (req, res) => {
    array.splice(req.params.valor,1);
    console.log(minhas_notas[req.params.valor]);
    return res.send("Valor eliminado: " + req.params.valor);
});

//g)
app.delete('/', (req, res) => {
    minhas_notas.length = 0;
    console.log(minhas_notas);
    return res.send("Array vazio.");
})

// Iniciar o servidor
app.listen(port, () => {
    // Ex 1
    console.log(`Servidor em http://localhost:${port}\nNomes: Matilde Sequeira, Alessandra Delgado, Ana Silva, Carolina Gegaloto`);
});
