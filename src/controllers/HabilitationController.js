const Habilitation = require('../models/Habilitation');

module.exports = {
    async getHabilitations(req, res){
        const habilitations = await Habilitation.find(); 

        return res.json(habilitations);

    },
    
    async createHabilitation(req, res){
        const habilitation = await Habilitation.create(req.body);

        return res.json(habilitation); 
    },

    async getHabilitationById(req, res){
        const habilitation = await Habilitation.findById(req.params.id);

        return res.json(habilitation);
    }
};
