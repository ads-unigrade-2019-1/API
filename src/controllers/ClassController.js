const Class = require('../models/Class');

module.exports = {
    async getClasses(req, res){
        const classes = await Class.find();

        return res.json(classes);
    },

    async createClass(req, res){
        const class_body = await Class.create(req.body);


        return res.json(class_body);
    },
    async getClassById(req, res){

        const class_body = await Class.findById(req.params.id);
        
        return res.json(class_body);
    },

}