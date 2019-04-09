const mongoose = require('mongoose');

const Class = require('./Class');


const TeacherSchema = mongoose.Schema({
    name: String,
    class : [{type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true}]
});

const Teacher = module.exports = mongoose.model('Teacher', TeacherSchema);