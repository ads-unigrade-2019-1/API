const mongoose = require('mongoose');

const Class = require('./Class');
const course = require('./Course');
const teacher = require('./Teacher');


const DisciplineSchema = mongoose.Schema({
    name : String,
    department : String,
    credit : Number,
    category : String,
    class : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    requirement : [{type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: false}],
    course : [{type: mongoose.Schema.Types.ObjectId, ref: 'course'}]
});

const Discipline = module.exports = mongoose.model('Discipline', DisciplineSchema);