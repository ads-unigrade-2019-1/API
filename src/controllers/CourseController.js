const Course = require('../models/Course');

module.exports = {
    async index(req, res){
        const courses = await Course.find();

        return res.json(courses);
    },

    async create(req, res){
        const course = await Course.create(req.body);

        return res.json(course); 
    },
}
