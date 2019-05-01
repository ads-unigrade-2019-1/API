const Disciplines = require('../models/Discipline')
const Classes = require('../models/Class');

module.exports = {

    getFilterSearch(req, res) {

        const filterSearch = req.body.search;

        Disciplines.find({
            $or: [
                { 'name': new RegExp(filterSearch, "i") },
                { 'code': new RegExp(filterSearch, "i") }
            ]
        }).then(disciplines => {

            if (disciplines.length !== 0) {
                res.json(disciplines);
            }

            disciplines_teachers = Classes.find({ 'teachers': new RegExp(filterSearch, "i") })
                .then(teacher_disciplines => {
                    res.json(teacher_disciplines);
                }).catch(error => {
                    res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
                });

        }).catch(error => {
            res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
        })
    }
    
}