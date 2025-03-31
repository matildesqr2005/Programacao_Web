let buttonNotas = document.getElementById("buttonNotas");
let buttonNotasPosition = document.getElementById("buttonNotasPosition");
let buttonAddValue = document.getElementById("buttonAddValue");
let buttonAddParamVal = document.getElementById("buttonAddParamVal");
let buttonUpdatePosition = document.getElementById("buttonUpdatePositon");
let buttonDeletePosition = document.getElementById("buttonDeletePosition");
let deleteAll = document.getElementById("deleteAll");

const url= "http://localhost:3000/"; 

buttonNotas.addEventListener('click', function() {
	
    let notasInput = document.getElementById("notas");

	fetch(url)
                .then(response => response.json())
                .then(data => {
                    notasInput.value = data;
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
});

/*
try {
        const response = await fetch(API_URL);
        const data = await response.json();
        notasInput.value = data.join(', ');
    } catch (error) {
        console.error('Erro:', error);
        notasInput.value = "Erro ao carregar notas";
    }
*/

buttonNotasPosition.addEventListener('click', function(){
    let notasPosition = document.getElementById("notasPosition");

    fetch(url + notasPosition.value)
                .then(response => response.json())
                .then(data => {
                    notasPosition.value = data;
                })
                .catch(error => {
                    console.error('Erro:', error);
                    notasPosition.value = "Invalid index";
    });
});

buttonAddValue.addEventListener('click', function() {
    let notasAdd = document.getElementById("notasAddValue");
    console.log(notasAdd);
    fetch(url + notasAdd.value, {method : 'POST', body:JSON.stringify({nota:notasAdd.value})})
                .then(response => response.json())
                .then(data => {
                    notasAdd.value = data;
                })
                .catch(error => {
                    console.error('Erro:', error);
    });
});

buttonAddParamVal.addEventListener('click', function(){
    let notasAddParam = document.getElementById("notasAddParam");
    console.log(notasAddParam);
    fetch(url + notas)
})

deleteAll.addEventListener('click', function(){
    fetch(url, {method : 'DELETE'})
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Erro:', error);
    });
})