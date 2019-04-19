const express = require('express');

const routes = express.Router();

const DisciplineController = require('./controllers/DisciplineController');
const ClassController = require('./controllers/ClassController');


routes.get('/', DisciplineController.hello);
routes.get('/disciplines', DisciplineController.index);
routes.post('/discipline', DisciplineController.create);

routes.get('/classes', ClassController.getClasses);
routes.post('/class', ClassController.createClass);

module.exports = routes; 