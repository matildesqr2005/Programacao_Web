document.getElementById('idForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const clientId = document.getElementById('id').value;
    fetchClientData(clientId);
});

function fetchClientData(clientId) {
    fetch(`http://localhost:3000/client/${clientId}`)
        .then(response => {
            if (!response.ok) {
                console.log(response.error);
                throw new Error('Client not found!!');
            }
            return response.json();
        })
        .then(data => {
            displayClientData(data);
        })
        .catch(error => {
            alert(error.message);
            clearDisplay();
        });
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