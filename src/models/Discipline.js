const mongoose = require('mongoose');

const Class = require('./Class');
const course = require('./Course');
const teacher = require('./Teacher');


const DisciplineSchema = mongoose.Schema({
    name : String,
    department : String,
    credits : Number,
    category : String,
    classes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    requirements : [{type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: false}],
    course : [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
});

const Discipline = module.exports = mongoose.model('Discipline', DisciplineSchema);