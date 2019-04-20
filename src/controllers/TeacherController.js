const Teacher = require('../models/Teacher');

module.exports = {
    async index(req, res){
        const teachers = await Teacher.find();

        return res.json(teachers);
    },

    async create(req, res){
        const teacher = await Teacher.create(req.body);

        return res.json(teacher); 
    },
}
