// Importar o módulo express
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// Criar uma instância do aplicativo Express
const app = express();
const mongoose = require('mongoose');

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

//database
const url = "mongodb+srv://grupoPWEB:52zfMMKicezh3cOj@disciplinas.uvkvp7l.mongodb.net/";
const dbName = "node_assessment_lab"; //Colocar o nome da Base de dados em Questão
const connect = mongoose.connect(url, { dbName: dbName });

//router
const client = require("./Controllers/client");
app.use("/client", client);

connect.then((db) => {
    console.log("Connected correctly to server");
    app.listen(port, () => console.log(`Consumos ${port}!`));
 })