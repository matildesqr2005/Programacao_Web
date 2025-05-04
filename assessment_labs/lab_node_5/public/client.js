let authToken = null;


document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Formulário de login submetido');

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
        
    try {
        console.log('Enviando credenciais:', { email, password });

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log('Resposta recebida:', response);

        const data = await response.json();
        
        if (data.success) {
            authToken = data.accessToken;
            localStorage.setItem('accessToken', data.accessToken);
            document.getElementById('login-section').style.display = 'none';
            alert('Login realizado com sucesso!');
        } else {
            alert(data.error || 'Login falhou');
        }
    } catch (error) {
        alert('Erro durante o login');
        console.error(error);
    }
});

document.getElementById('idForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const clientId = document.getElementById('id').value;
    await fetchClientData(clientId);
});

async function refreshAcessToken() {
    try{
        const response = await fetch(`http://localhost:3000/refresh`, {
            method:'POST',
            credentials: 'include'
        });

        const data = await response.json();

        if(data.accessToken){
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        }else{
            alert("Faça login de novo");
        }
    } catch (error) {
        alert(error.message);
    }
}


async function fetchClientData(clientId) {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
        alert('Por favor, faça login primeiro');
        return;
    }

   try {
        const response = await fetch(`http://localhost:3000/client/${clientId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        });

        if(response.status === 401){
            const newAccessToken = await refreshAcessToken();
            if(newAccessToken)
                fetchClientData(clientId);

            return;
        }

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const result = await response.json();
        if (result.success) {
            displayClientData(result.data);
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        alert(error.message);
        clearDisplay();
    }
}

function displayClientData(clientData) {
    document.getElementById('name').value = clientData.nome;
    document.getElementById('adrStreet').value = clientData.endereco.rua;
    document.getElementById('adrNo').value = clientData.endereco.numero;
    document.getElementById('adrCity').value = clientData.endereco.cidade;
    document.getElementById('adrPostal').value = clientData.endereco.codigoPostal;
    document.getElementById('adtResid').value = clientData.informacoesAdicionais.tipoTarifa;
    document.getElementById('adrProv').value = clientData.informacoesAdicionais.fornecedorEnergia;
    if (clientData.informacoesAdicionais.contratoAtivo) {
        document.getElementById('adtActive').value = 'Sim';
    } else {
        document.getElementById('adtActive').value = 'Não';
    }

    const consumoBody = document.getElementById('consumBody');
    consumoBody.innerHTML = ''; 
    clientData.consumo.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.mes}</td>
            <td>${item.ano}</td>
            <td>${item.kWhConsumido}</td>
            <td>${item.custoTotal.toFixed(2)}</td>
            <td>${item.dataLeitura}</td>
        `;
        consumoBody.appendChild(row);
    });
}

function clearDisplay() {
    document.getElementById('name').value = '';
    document.getElementById('adrStreet').value = '';
    document.getElementById('adrNo').value = '';
    document.getElementById('adrCity').value = '';
    document.getElementById('adrPostal').value = '';
    document.getElementById('adtResid').value = '';
    document.getElementById('adrProv').value = '';
    document.getElementById('adtActive').value = '';
    document.getElementById('consumBody').innerHTML = '';
}