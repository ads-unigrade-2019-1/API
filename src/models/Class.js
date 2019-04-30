const mongoose = require('mongoose');

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
    campus : Number,
    
});

const Class = module.exports = mongoose.model('Class', ClassSchema);
