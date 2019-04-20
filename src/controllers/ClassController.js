const Class = require('../models/Class');

module.exports = {
    async index(req, res){
        const classes = await Class.find();

        return res.json(classes);
    },

    async create(req, res){
        const lecture = await Class.create(req.body);

        return res.json(lecture); 
    },
}
