const mongoose = require('mongoose');

const discipline = require('./Discipline');


const CourseSchema = new mongoose.Schema({
    code : String, 
    campus : Number,
    name : String,
    shift : String, 
    modality : String, 
    habilitations : [Number],
});

const Course = module.exports = mongoose.model('Course', CourseSchema);