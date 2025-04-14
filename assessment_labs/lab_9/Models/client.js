const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
    {
        clienteId: {
            type: String,
            required: true,
            unique: true
        },
        nome: {
            type: String,
            required: true,
        },
        endereco: {
            rua: {
                type: String,
                required: true,
            },
            numero: {
                type: String,
                required: true,
            },
            cidade: {
                type: String,
                required: true,
            },
            codigoPostal: {
                type: String,
                required: true,
            }
        },
        consumo: [
            {
                mes: {
                    type: String,
                    required: true,
                },
                ano: {
                    type: Number,
                    required: true,
                },
                kWhConsumido: {
                    type: Number,
                    required: true,
                },
                custoTotal: {
                    type: Number,
                    required: true,
                },
                dataLeitura: {
                    type: String,
                    required: true,
                }
            }],
        informacoesAdicionais: {
            tipoTarifa: {
                type: String,
                required: true,
            },
            fornecedorEnergia: {
                type: String,
                required: true,
            },
            contratoAtivo: {
                type: Boolean,
                required: true,
            }
        }
    },{
        timestamps: true
    }
);

module.exports = mongoose.model('client', clientSchema);

