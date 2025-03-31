// Importar o módulo express
const express = require('express');
const cors = require('cors');

// Criar uma instância do aplicativo Express
const app = express();

// Definir a porta onde o servidor vai escutar
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log("Hello World!!");
})

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`);
});

