"use strict"
const Chain = require('./Chain');
const Disciplines =  require('../../models/Discipline');

class CodeSearch extends Chain {

    constructor() {
        super();
        this.nextInChain;
        this.filterSearch = '';
    }

    setNext(c) {
        this.nextInChain = c;
    }

    async execute(req, res) {

        if (req.body.search == null){
            return res.json({ 'error': '400 - Bad Request'});
        }

        this.filterSearch = this.make_pattern(req.body.search);

        await Disciplines.find({'code': this.filterSearch})
            .then(response => {
                if (response.length !== 0) {
                    return res.json(response);
                }
                else {
                    this.nextInChain.execute(req, res);
                }
            })
            .catch(error => {
                res.json({'error' : `Unable to do the search: ${error}`})
            })
    }

}

module.exports = CodeSearch;
