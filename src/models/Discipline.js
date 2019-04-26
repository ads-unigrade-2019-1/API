const mongoose = require('mongoose');

const Class = require('./Class');
const course = require('./Course');
const teacher = require('./Teacher');


const DisciplineSchema = new mongoose.Schema({

    name : String,
    code : String, 
    department : String,
    credits : String,
    category : String,
    classes : [String],
    requirements : [String],
});

const Discipline = module.exports = mongoose.model('Discipline', DisciplineSchema);