const mongoose = require('mongoose');

const materia = require('./Materia');


const CursoSchema = mongoose.Schema({
    nome : String,
    campus : String,
    materia : [{type: mongoose.Schema.Types.ObjectId, ref: 'materia', required: true}]
});

const Curso = module.exports = mongoose.model('Curso', CursoSchema);