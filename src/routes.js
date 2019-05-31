const express = require('express');

const routes = express.Router();

const DisciplineController = require('./controllers/DisciplineController');
const ClassController = require('./controllers/ClassController');
const CourseController = require('./controllers/CourseController');
const HabilitationController = require('./controllers/HabilitationController');
const SearchController = require('./controllers/SearchController');
const TimetableController = require('./controllers/TimetableController')

routes.get('/', DisciplineController.hello);
routes.get('/disciplines', DisciplineController.index);
routes.post('/discipline', DisciplineController.create);
//routes.get('/discipline/:id', DisciplineController.getDisciplineById);
routes.get('/classes/:code', ClassController.getClassesOfDiscipline);
routes.get('/classes/:code/:name', ClassController.getClassesOfespecificDiscipline);
routes.get('/discipline/:code', DisciplineController.getCreditsOfDiscipline);



routes.get('/classes', ClassController.getClasses);
routes.post('/class', ClassController.createClass);
//routes.get('/class/:id', ClassController.getClassById);


routes.get('/courses', CourseController.getCourses);
routes.post('/course', CourseController.createCourse);
/* routes.get('/course/:id', CourseController.getCourseById); */
routes.post('/course/:campus', CourseController.getCoursesDarcy);


routes.get('/habilitations', HabilitationController.getHabilitations);
routes.post('/habilitation', HabilitationController.createHabilitation);
routes.get('/habilitation/:id', HabilitationController.getHabilitationById);

routes.post('/search', SearchController.getFilterSearch);
routes.post('/timetable', TimetableController.mountTimetable);

routes.get('/timetable/r/', TimetableController.randomTimeTable);



module.exports = routes; 