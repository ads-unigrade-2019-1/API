const express = require('express');

const routes = express.Router();

const DisciplineController = require('./controllers/DisciplineController');
const ClassController = require('./controllers/ClassController');
const CourseController = require('./controllers/CourseController');
const HabilitationController = require('./controllers/HabilitationController');


routes.get('/', DisciplineController.hello);
routes.get('/disciplines', DisciplineController.index);
routes.post('/discipline', DisciplineController.create);
//routes.get('/discipline/:id', DisciplineController.getDisciplineById);
routes.get('/discipline/:code', ClassController.getClassesOfDiscipline);


routes.get('/classes', ClassController.getClasses);
routes.post('/class', ClassController.createClass);
routes.get('/class/:id', ClassController.getClassById);


routes.get('/courses', CourseController.getCourses);
routes.post('/course', CourseController.createCourse);
routes.get('/course/:id', CourseController.getCourseById);

routes.get('/habilitations', HabilitationController.getHabilitations);
routes.post('/habilitation', HabilitationController.createHabilitation);
routes.get('/habilitation/:id', HabilitationController.getHabilitationById);




module.exports = routes; 