const TeacheSearch = require('./search/TeacherSearch');
const CodeSearch = require('./search/codeSearch');
const NameDisciplineSearch = require('./search/NameDisciplineSearch');

module.exports = {

    async getFilterSearch(req, res) {
        
        let nameSearch = new NameDisciplineSearch();
        let codeSearch = new CodeSearch();
        let teacheSearch = new TeacheSearch();

        //Cases visited in chain of responsibility
        nameSearch.setNext(codeSearch);
        codeSearch.setNext(teacheSearch);

        // Header of list
        nameSearch.execute(req, res);

    }

};