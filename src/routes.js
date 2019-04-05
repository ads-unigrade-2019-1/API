const express = require('express');

const routes = express.Router();

const MateriaController = require('./controllers/MateriaController');

routes.get('/', MateriaController.hello);
routes.get('/materias', MateriaController.index);
routes.post('/materia', MateriaController.create);

module.exports = routes; 