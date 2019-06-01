const Course = require('../models/Course');
const Habilitation = require('../models/Habilitation');

module.exports = {
    async getCourses(req, res) {
        const courses = await Course.find();

        return res.json(courses);

    },

    async createCourse(req, res) {
        const course = await Course.create(req.body);

        return res.json(course);
    },

    async getCourseById(req, res) {
        const course = await Course.findById(req.params.id);

        return res.json(course);
    },

    async getCoursesByCampus(req, res) {

        var campus = req.params.campus

        if (typeof (parseInt(campus)) != 'number' || parseInt(campus) > 4 || parseInt(campus) < 1) {
            return res.status(403).send("Wrong parameter");
        }

        const courses = await Course.find({ "campus": req.params.campus });
        var results = [];
        var name = '';
        for (const c in courses) {

            for (var h = 0; h < courses[c].habilitations.length; h++) {

                var code = courses[c].habilitations[h].toString();

                const habilitation = await Habilitation.find({ "code": code });

                if (courses[c].habilitations && courses[c].habilitations.length > 1) {

                    name = courses[c].name + " - " + habilitation[0].name;
                } else {

                    name = courses[c].name;
                }
            }

            var course = {
                name: name,
                code: code
            }

            results.push(course);
        }
        return res.json(results);
    }
};