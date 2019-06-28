"use strict"
const Chain = require('./Chain');
const Disciplines =  require('../../models/Discipline');

class CodeSearch extends Chain {

    constructor() {
        super();
        this.nextInChain;
    }

    setNext(c) {
        this.nextInChain = c;
    }

    async execute(req, res,filterSearch) {
        await Disciplines.find({'code': filterSearch})
            .then(response => {
                if (response.length !== 0) {
                    return res.json(response);
                }
                else {
                    this.nextInChain.execute(req, res, filterSearch);
                }
            })
            .catch(error => {
                res.json({'error' : `Unable to do the search: ${error}`})
            })
    }

}

module.exports = CodeSearch;
