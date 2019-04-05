const mongoose = require('mongoose');

const professor = require('./Professor');
const materia = require('./Materia');


const TurmaSchema = mongoose.Schema({
    nome : String,
    vaga : Number,
    professor : [{ type: mongoose.Schema.Types.ObjectId, ref: 'professor' }],
    sala : [String],
    dia : [String],
    hora : [String],
    materia : { type: mongoose.Schema.Types.ObjectId, ref: 'materia', required: true }
    
});

const Turma = module.exports = mongoose.model('Turma', TurmaSchema);
