const Materia = require('../models/Materia');

module.exports = {
    async index(req, res){
        const materias = await Materia.find();

        return res.json(materias);
    },

    async create(req, res){
        const materia = await Materia.create(req.body);

        return res.json(materia); 
    },

    async hello(req, res){
        res.send('Hello World!');
    }
}
