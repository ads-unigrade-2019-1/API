const Teacher = require('../models/Teacher');

module.exports = {
    async getTeachers(req, res){
        const teachers = await Teacher.find();

        return res.json(teachers);
    },

    async createTeacher(req, res){
        const teacher = await Teacher.create(req.body);

        return res.json(teacher);
    },

    async getTeacherById(req, res){
        const teacher = await Teacher.findById(req.params.id);

        return res.json(teacher);
    }
}