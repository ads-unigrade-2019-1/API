"use strict"
const Chain = require("./Chain");
const Discipline = require("../../models/Discipline");
const Classes = require('../../models/Class');


class TeacherSearch extends Chain {

    constructor() {
        super();
        this.nextInChain;
        this.filterSearch = '';
    }

    setNext(c) {
        this.nextInChain = c;
    }

    getUnique(arr, index) {
        // this function returns a list with unrepeated elements

        const unique = arr
            .map(elem => elem[index])
            .map((elem, indexInside, final) => final.indexOf(elem) === indexInside && indexInside)
            .filter(elem => arr[elem]).map(elem => arr[elem]);
      
         return unique;
    }

    async execute(req, res) {

        if (req.body.search == null){
            return res.json({ 'error': '400 - Bad Request'});
        }

        this.filterSearch = this.make_pattern(req.body.search);

        await Classes.find({ 'teachers': this.filterSearch })
            .then(async teacher_disciplines => {

                let disciplinesFromTeacher = [];

                for (let discipline of teacher_disciplines){

                    let gotDiscipline = await Discipline.findOne({'code' : discipline.discipline})
                        .then(currentDiscipline => {
                            return currentDiscipline;
                        })
                        .catch(error => {
                            res.json({'error' : `Unable to do search: ${error}`})
                        })

                    disciplinesFromTeacher.push(gotDiscipline);
                }

                //Take disciplines wtih diferent code
                let setDisciplines = this.getUnique(disciplinesFromTeacher, 'code');

                return res.json(setDisciplines);
                
            }).catch(error => {
                res.json({'error' : `Unable to do the search: ${error}`});
            })
    }

}

module.exports = TeacherSearch;