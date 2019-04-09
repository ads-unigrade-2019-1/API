const mongoose = require('mongoose');

const teacher = require('./Teacher');
const discipline = require('./Discipline');


const ClassSchema = mongoose.Schema({
    name : String,
    vacancy : Number,
    teacher : [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
    classroom : [String],
    day : [String],
    time : [String],
    discipline : { type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: true }
    
});

const Class = module.exports = mongoose.model('Class', ClassSchema);