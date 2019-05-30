const mongoose = require('mongoose');

const HabilitationSchema = new mongoose.Schema({
    code : Number,
    name : String,
    disciplines : [[String]]
});

module.exports = mongoose.model('Habilitation', HabilitationSchema);