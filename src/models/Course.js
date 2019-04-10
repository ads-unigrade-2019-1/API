const mongoose = require('mongoose');

const discipline = require('./Discipline');


const CourseSchema = new mongoose.Schema({
    name : String,
    campus : String,
    disciplines : [{type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: true}]
});

const Course = module.exports = mongoose.model('Course', CourseSchema);