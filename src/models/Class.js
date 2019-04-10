const mongoose = require('mongoose');

const teacher = require('./Teacher');
const discipline = require('./Discipline');


const ClassSchema = new mongoose.Schema({
    name : String,
    vacancy : Number,
    teachers : [{ type: mongoose.Schema.Types.ObjectId, ref: 'teacher' }],
    meetings : [{
        classroom : String,
        day : String,
        time : String,
    }],
    discipline : { type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: true }
    
});

const Class = module.exports = mongoose.model('Class', ClassSchema);
