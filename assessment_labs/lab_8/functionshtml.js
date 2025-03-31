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
    fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({nota:notasAdd.value})
    })
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
    fetch(url + notasAddParam.value, {method: 'POST'})
                .then(response => response.json())
                .then(data => {
                    notasAddParam.value = data;
                })
                .catch(error => {
                    console.error('Error', error);
         });
});

buttonDeletePosition.addEventListener('click', function(){
    let notaDel = document.getElementById("notaDel");
    console.log(notaDel);
    fetch(url + notaDel.value, {method: 'DELETE'} )
                .then(response => response.json())
                .then(data => {
                    notaDel.value = data;
                })
                .catch(error => {
                    console.error('Error', error);
        });
});

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