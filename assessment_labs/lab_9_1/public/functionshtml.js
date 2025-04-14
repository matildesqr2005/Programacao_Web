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
buttonNotasPosition.addEventListener('click', function () {
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

//c)
buttonAddValue.addEventListener('click', function () {
    let notasAdd = document.getElementById("notasAddValue");
    let cod = document.getElementById("cod");
    let nome_disc = document.getElementById("disc");
    let nome_prof = document.getElementById("prof");
    console.log(notasAdd);
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cod: cod.value,
            nome_disc: nome_disc.value,
            nome_prof: nome_prof.value,
            nota: notasAdd.value
        })
    })
        .then(response => response.json())
        .then(data => {
            cod.textContent = data.cod;
            nome_disc.textContent = data.nome_disc;
            nome_prof.textContent = data.nome_prof;
            notasAdd.textContent = data.nota;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});


//d
buttonAddParamVal.addEventListener('click', function(){
    let notasAddParam = document.getElementById("notasAddParam");
    let cod = document.getElementById("codParam");
    let disc = document.getElementById("discParam");
    let prof = document.getElementById("profParam");

    //Monta o URL com parâmetros codificados
    const fullURL = `${url}/add/${encodeURIComponent(cod)}/${encodeURIComponent(disc)}/${encodeURIComponent(prof)}/${encodeURIComponent(notasAddParam)}}`;

    fetch (fullURL, {method: 'POST'})
        .then (response => response.json())
        .then (data => {
            cod.value = data.cod;
            notasAddParam.value = data.notas;
            disc.value = data.disc;
            prof.value = data.prof;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

//e

buttonUpdatePosition.addEventListener('click', function(){
    let notaUpdate = document.getElementById("notaUpdate");
    let indexUpdate = document.getElementById("indexUpdate");   

    fetch(url + indexUpdate.value, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nota: notaUpdate.value})
    })
            .then(response => response.json())
})
