const mongoose = require('mongoose');

const turma = require('./Turma');
const curso = require('./Curso');
const professor = require('./Professor');


const MateriaSchema = mongoose.Schema({
    nome : String,
    departamento : String,
    credito : Number,
    categoria : String,
    turma : [{ type: mongoose.Schema.Types.ObjectId, ref: 'turma' }],
    preRequisito : [{type: mongoose.Schema.Types.ObjectId, ref: 'materia', required: false}],
    curso : [{type: mongoose.Schema.Types.ObjectId, ref: 'curso'}]
});

const Materia = module.exports = mongoose.model('Materia', MateriaSchema);