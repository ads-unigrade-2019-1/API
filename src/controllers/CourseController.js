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
    },

    async getCoursesByCampus(req, res){

        var campus = req.params.campus

        if ( typeof(campus) != 'number' || (campus > 4 || campus < 1)) {
            return res.status(403).send("Wrong parameter");
        }
        
        const courses = await Course.find({"campus": req.params.campus});

        return res.json(courses);
    }
};