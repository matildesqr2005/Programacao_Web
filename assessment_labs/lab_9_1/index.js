// Importar o módulo express
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

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


// Middleware para analisar o corpo das requisições como JSON
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
const url = "mongodb+srv://grupoPWEB:52zfMMKicezh3cOj@disciplinas.uvkvp7l.mongodb.net/";
const dbName = "Disciplinas"; //Colocar o nome da Base de dados em Questão
const connect = mongoose.connect(url, { dbName: dbName });

//router
const notasRouter = require("./Controllers/notas")(notas_info);
app.use('/notas', notasRouter);

connect.then((db) => {
    console.log("Connected correctly to server");
    var notas = require("./Controllers/notas");
    app.use('/notas', notas);
    app.listen(port, () => console.log('As minhas notas ${port}!'))
    })


// Iniciar o servidor
app.listen(port, () => {
    // Ex 1
    console.log(`Servidor em http://localhost:${port}\nNomes: Matilde Sequeira, Alessandra Delgado, Ana Silva, Carolina Gegaloto`);
});
