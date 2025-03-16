// Obter o elemento botao
const botao = document.getElementById("botao");

//mudar h1 para ola mundo quando a pagina estiver carregada
document.addEventListener("DOMContentLoaded", function(){
    const h1 = document.querySelector("h1");
    h1.textContent = "Olá, mundo!";
})

// Adicionar um event handler ao botão 
botao.addEventListener("click", function(){
    // Manipular o elemento h1
    const h1 = document.querySelector("h1");
    h1.textContent = "Botão clicado!";

    // Muda cor de fundo do h1 para vermelho, quando botão clicado
    h1.style.backgroundColor = "red";
});

// Obter o elemento texto
const campotexto = document.getElementById("campoTexto");

// Event handler que imprima texto quando pressionado Enter
campotexto.addEventListener("keypress", function (event){
    if (event.key === "Enter"){
        console.log(campotexto.value);
    }
});

// Obter o elemento lista 
const lista = document.getElementById("lista");

// Event handler que remove o elemento da lista quando o utilizador clicar nele
lista.addEventListener("click", function(event){
    if (event.target.tagName === "LI"){
        event.target.remove();
    }
});


