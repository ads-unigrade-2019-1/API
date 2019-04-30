const Habilitations = require('../models/Class');
const Course = require('../models/Course');
const Disciplines = require('../models/Discipline')

module.exports = {
    async getFilterSearch (req, res){
        disciplines = await Disciplines.find({"$or": 
                                            [{"code": req.body.search},
                                            {'name': req.body.search}]
        })
        if(disciplines !== []){
            res.json(disciplines)
        }

    }
}