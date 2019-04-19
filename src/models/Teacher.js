const mongoose = require('mongoose');

const Class = require('./Class');


const TeacherSchema = new mongoose.Schema({
    name: String,
    classes : [{type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true}]
});

const Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);