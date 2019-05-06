const Discipline = require('../models/Discipline');

module.exports = {
    async index(req, res) {
        const disciplines = await Discipline.find();

        return res.json(disciplines);
    },

    async create(req, res) {
        const discipline = await Discipline.create(req.body);

        return res.json(discipline);
    },

    async hello(req, res) {
        res.send('Hello World!');
    },

    async getDisciplineById(req, res) {
        const discipline = await Discipline.findById(req.params.id);

        return res.json(discipline);
    },

    async getDisciplineById(req, res) {
        const discipline = await Discipline.findById(req.params.id);

        return res.json(discipline);
    },

    async getCreditsOfDiscipline(req, res) {

        const discipline = await Discipline.find({"code": req.params.code});

        return res.json(discipline);

    },
}
