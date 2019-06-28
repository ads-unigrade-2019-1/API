"use strict"
const Chain = require('./Chain');
const Discipline = require('../../models/Discipline');

class NameDisciplineSearch extends Chain {

    constructor () {
        super();
        this.nextInChain;
    }

    setNext(c){
        this.nextInChain = c;
    }

    async execute(req, res, filterSearch){

        await Discipline.find({'name': filterSearch})
            .then(response => {

                if (response.length !== 0 ){
                    return res.json(response);
                }

                this.nextInChain.execute(req, res, filterSearch);

            }).catch(error => {
                return res.json({'error': `Unable to do search: ${error}`});
            })
    }

}

module.exports = NameDisciplineSearch;