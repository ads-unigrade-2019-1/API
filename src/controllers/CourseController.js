const Course = require('../models/Course');

module.exports = {
    async getCourses(req, res){
        const courses = await Course.find(); 

        return res.json(courses);

    },
    
    async createCourse(req, res){
        const course = await Course.create(req.body);

        return res.json(course); 
    },

    async getCourseById(req, res){
        const course = await Course.findById(req.params.id);

        return res.json(course);
    }
};