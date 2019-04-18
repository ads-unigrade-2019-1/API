const Discipline = require('../models/Discipline');

module.exports = {
    async index(req, res){
        const disciplines = await Discipline.find();

        return res.json(disciplines);
    },

    async create(req, res){
        const discipline = await Discipline.create(req.body);

        return res.json(discipline); 
    },

    async hello(req, res){
        res.send('Hello World!');
    }
}
