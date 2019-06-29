"use strict"
const Chain = require('./Chain');
const Discipline = require('../../models/Discipline');

class NameDisciplineSearch extends Chain {

    constructor () {
        super();
        this.nextInChain;
        this.filterSearch = '';
    }

    setNext(c){
        this.nextInChain = c;
    }

    async execute(req, res){

        if (req.body.search == null){
            return res.json({ 'error': '400 - Bad Request'});
        }

        this.filterSearch = this.make_pattern(req.body.search);

        await Discipline.find({'name': this.filterSearch})
            .then(response => {

                if (response.length !== 0 ){
                    return res.json(response);
                }

                this.nextInChain.execute(req, res);

            }).catch(error => {
                return res.json({'error': `Unable to do search: ${error}`});
            })
    }

}

module.exports = NameDisciplineSearch;