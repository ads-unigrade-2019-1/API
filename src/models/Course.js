const mongoose = require('mongoose');

const discipline = require('./Discipline');


const CourseSchema = mongoose.Schema({
    name : String,
    campus : String,
    discipline : [{type: mongoose.Schema.Types.ObjectId, ref: 'discipline', required: true}]
});

const Course = module.exports = mongoose.model('Course', CourseSchema);