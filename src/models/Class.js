const mongoose = require('mongoose');

const teacher = require('./Teacher');
const discipline = require('./Discipline');


const ClassSchema = new mongoose.Schema({
    name : String,
    vacancies : Number,
    teachers : [String],
    meetings : [{
        room : String,
        day : String,
        init_hour : String,
        final_hour : String
    }],
    discipline : [String],
    shift : String,
    
});

const Class = module.exports = mongoose.model('Class', ClassSchema);
