let buttonNotas = document.getElementById("buttonNotas");
let buttonNotasPosition = document.getElementById("buttonNotasPosition");
let buttonAddValue = document.getElementById("buttonAddValue");
let buttonAddParamVal = document.getElementById("buttonAddParamVal");
let buttonUpdatePosition = document.getElementById("buttonUpdatePosition");
let buttonDeletePosition = document.getElementById("buttonDeletePosition");
let deleteAll = document.getElementById("deleteAll");

const url = "http://localhost:3000/notas/";

//a
buttonNotas.addEventListener('click', function () {

    let notasInput = document.getElementById("notas");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            notasInput.value = data
                .map(n => `COD: ${n.cod} | Disciplina: ${n.nome_disc} | Professor: ${n.nome_prof} | Nota: ${n.nota} `)
                .join("\n");
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

//b
buttonNotasPosition.addEventListener('click', function(){
    let notasPosition = document.getElementById("notasPosition");

    fetch(url + notasPosition.value)
                .then(response => response.json())
                .then(data => {
                    notasPosition.value = `COD: ${data.cod} | Disciplina: ${data.nome_disc} | Professor: ${data.nome_prof} | Nota: ${data.nota}`;
                })
                .catch(error => {
                    console.error('Erro:', error);
                    notasPosition.value = "Invalid index";
    });
});