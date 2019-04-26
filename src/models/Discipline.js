const mongoose = require('mongoose');

const Class = require('./Class');
const course = require('./Course');
const teacher = require('./Teacher');


const DisciplineSchema = new mongoose.Schema({

    name : String,
    department : String,
    credits : String,
    category : String,
    classes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    requirements : [{type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: false}],
    courses : [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
});

const Discipline = module.exports = mongoose.model('Discipline', DisciplineSchema);