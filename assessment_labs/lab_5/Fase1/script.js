// **var**
// !Explicação: Var permite atualização e redeclaração no mesmo escopo

var nome = "Felix";
console.log(nome); // "João"

nome = "Maria";
console.log(nome); // "Maria"

var nome = "Joaquim";
console.log(nome);

// **let**
// !Explicação: Let permite atualização mas não a redeclaração no mesmo escopo

let ano = 2025;
console.log(ano); 

let idade = 20;
console.log(idade); // 20

idade = 21;
console.log(idade); // 21

// let idade = 40; <-- Resulta em erro.


// **const**
// !Explicação: Const não permite nem atualização nem a redeclaração no mesmo escopo

const PI = 3.14;
console.log(PI); // 3.14

//PI = 21.6;
// ^ Erro: Não é possível reatribuir o valor de uma constante
//console.log(PI);

// **Tipos de Dados**

// String
let frase = "Olá, Mundo!";
console.log(typeof frase); // "string"

// Number
let numero = 10;
console.log(typeof numero); // "number"

// Boolean
let verdadeiro = true;
console.log(typeof verdadeiro); // "boolean"

// Array
let lista = ["banana", "maçã", "laranja"];
console.log(typeof lista); // "object"
 
// Object
let pessoa = {
    name : "João", 
    idade : 20
}; 
console.log(typeof pessoa); // "Object"

compras = [
    "ovos",
    "leite",
    "massa",
    "farinha",              // !Explicação: Listas podem conter diferentes tipos de dados, incluindo objetos.
    "carne",
    1,
    numero,
    verdadeiro,
    pessoa
];
console.log(compras);

let cadeira = {
    nome : "Programação Web",
    codigo : 14331 ,
    curso : "Engenharia Informática"
};
console.log(cadeira);

//null
let nulo = null;
console.log(typeof nulo); // nulo

//undefined
let indefinido;
console.log (typeof indefinido); // "undefined"