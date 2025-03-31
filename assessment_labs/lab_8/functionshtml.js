let buttonNotas = document.getElementById("buttonNotas");
let buttonNotasPosition = document.getElementById("buttonNotasPosition");
let buttonAddValue = document.getElementById("buttonAddValue");

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
    fetch(url + notasAdd.value, {method : 'POST'})
                .then(response => response.json())
                .then(data => {
                    notasAdd.value = data;
                })
                .catch(error => {
                    console.error('Erro:', error);
    });
})