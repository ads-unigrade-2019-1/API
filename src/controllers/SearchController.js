const Disciplines = require('../models/Discipline')
const Classes = require('../models/Class');

function getUnique(arr, index) {

    const unique = arr
        .map(elem => elem[index])
        .map((elem, indexInside, final) => final.indexOf(elem) === indexInside && indexInside)
        .filter(elem => arr[elem]).map(elem => arr[elem]);
  
     return unique;
}

module.exports = {

    async getFilterSearch(req, res) {

        const filterSearch = req.body.search;

        Disciplines.find({
            $or: [
                { 'name': new RegExp(filterSearch, "i") },
                { 'code': new RegExp(filterSearch, "i") }
            ]
        }).then(async disciplines => {

            if (disciplines.length !== 0){
                return res.json(disciplines);
            }
    
            
            disciplines_teachers = await Classes.find({ 'teachers': new RegExp(filterSearch, "i") })
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

                    var setDisciplines = getUnique(disciplinesFromTeacher, 'code')

                    return res.json(setDisciplines);


                }).catch(error => {
                    res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
                });

        }).catch(error => {
            res.json({ 'error': `Não foi possível fazer a pesquisa: ${error}` });
        })
    }

}