// Importar o módulo express
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// Criar uma instância do aplicativo Express
const app = express();

// Definir a porta onde o servidor vai escutar
const port = 3000;

const methodLogger = function (req, res, next) {
    let date = new Date();
    console.log(`Reveived ${req.method} method. Date-Time (PT): ${date.toLocaleDateString("pt-PT")} ${date.toLocaleTimeString("pt-PT")}`);
    next();
}
  
  
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para analisar o corpo das requisições como JSON
app.use(methodLogger);
app.use(express.json());
app.use(cors());


app.get('/client/:id', (req, res) => {
    const clientId = req.params.id;
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo' });
        }
        const jsonData = JSON.parse(data);
        if (jsonData.clienteId === clientId) {
            return res.status(200).json(jsonData);
        } else {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`);
});

