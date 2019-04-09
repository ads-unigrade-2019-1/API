const express = require('express');

const routes = express.Router();

const DisciplineController = require('./controllers/DisciplineController');

routes.get('/', DisciplineController.hello);
routes.get('/disciplines', DisciplineController.index);
routes.post('/discipline', DisciplineController.create);

module.exports = routes; 