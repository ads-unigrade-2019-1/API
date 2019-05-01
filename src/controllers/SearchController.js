const Disciplines = require('../models/Discipline')
const Classes = require('../models/Class');

module.exports = {

    async getFilterSearch(req, res) {

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
                .then(async teacher_disciplines => {

                    var disciplinesFromTeacher = [];

                    for (discipline of teacher_disciplines) {

                        var gotDiscipline = await Disciplines.findOne({ 'code': discipline.discipline[0] })
                            .then(currentDiscipline => {
                                return currentDiscipline;
                            })
                            .catch(error => {
                                res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
                            })

                        disciplinesFromTeacher.push(gotDiscipline);
                    }

                    res.json(disciplinesFromTeacher);


                }).catch(error => {
                    res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
                });

        }).catch(error => {
            res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
        })
    }

}