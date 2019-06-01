const Course = require('../models/Course');
const Habilitation = require('../models/Habilitation');

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
        var results = [];
        for (const c in courses) {
            if (c.habilitation.length != 0) {
                for(h in c.habilitation) {
                    var habilitation_name = Habilitation.find({code: h});

                    var course = {
                        name: c.name + ' - ' + habilitation_name,
                        code: h
                    }

                    results.push(course);
                }
            } else {
                var course = {
                    name: c.name,
                    code: c.code
                }
                results.push(course);
            }
        }

        return res.json(results);
    }
};