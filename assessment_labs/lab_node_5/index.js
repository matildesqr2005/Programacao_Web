// Importar os módulos express e cors
const express = require('express');
const cors = require('cors');

// Importar controlador para cliente
const client = require('./Controller/client');

// Criar uma instância do aplicativo Express
const app = express();

// Definir a porta onde o servidor vai escutar
const port = 3000;

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());
app.use(cors());

// Router
app.use('/client', client);

// autentication
const authRoutes = require('./Routes/authRoutes');
app.use('/auth', authRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor em http://localhost:${port}`);
});

