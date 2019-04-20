const express = require('express');

const routes = express.Router();

const DisciplineController = require('./controllers/DisciplineController');
const ClassController = require('./controllers/ClassController');
const CourseController = require('./controllers/CourseController');
const TeacherController = require('./controllers/TeacherController');

routes.get('/', DisciplineController.hello);
routes.get('/disciplines', DisciplineController.index);
routes.post('/discipline', DisciplineController.create);

routes.get('/classes', ClassController.index);
routes.post('/class', ClassController.create);

routes.get('/courses', CourseController.index);
routes.post('/course', CourseController.create);

routes.get('/teachers', TeacherController.index);
routes.post('/teacher', TeacherController.create);


module.exports = routes; 