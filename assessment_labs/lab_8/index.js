// Importar o módulo express
const express = require('express');
const cors = require('cors');

// Criar uma instância do aplicativo Express
const app = express();

// Definir a porta onde o servidor vai escutar
const port = 3000;

let minhas_notas = [20,10,15,17];


// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(201).json(minhas_notas);
})

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port},\nNomes: Matilde Sequeira, Alessandra Delgado, Ana Silva, Carolina Gegaloto`);
});
