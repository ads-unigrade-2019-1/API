const mongoose = require('mongoose');

const HabilitationSchema = new mongoose.Schema({
    code : String,
    name : String,
    disciplines : [[String]]
});

const Habilitation = module.exports = mongoose.model('Habilitation', HabilitationSchema);