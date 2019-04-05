const mongoose = require('mongoose');

const turma = require('./Turma');


const ProfessorSchema = mongoose.Schema({
    nome: String,
    turma : [{type: mongoose.Schema.Types.ObjectId, ref: 'turma', required: true}]
});

const Professor = module.exports = mongoose.model('Professor', ProfessorSchema);