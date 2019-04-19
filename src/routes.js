const express = require('express');

const routes = express.Router();

const DisciplineController = require('./controllers/DisciplineController');
const ClassController = require('./controllers/ClassController');
const CourseController = require('./controllers/CourseController');
const TeacherController = require('./controllers/TeacherController');


routes.get('/', DisciplineController.hello);
routes.get('/disciplines', DisciplineController.index);
routes.post('/discipline', DisciplineController.create);

routes.get('/classes', ClassController.getClasses);
routes.post('/class', ClassController.createClass);

routes.get('/courses', CourseController.getCourses);
routes.post('/course', CourseController.createCourse);

routes.get('/teachers', TeacherController.getTeachers);
routes.get('/teacher', TeacherController.createTeacher);

module.exports = routes; 