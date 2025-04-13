const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  cod: { type: String, required: true, unique: true },
  nome_disc: { type: String, required: true },
  nome_prof: { type: String, required: true },
  nota: { type: Number, required: true,  
        min: [0, 'A nota deve ser maior ou igual a 0'],
        max: [20, 'A nota deve ser menor ou igual a 20']
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Nota', notaSchema);