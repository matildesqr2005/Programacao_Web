let buttonNotas = document.getElementById("buttonNotas");

buttonNotas.addEventListener('click', function() {
	const url= "http://localhost:3000/"; 
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