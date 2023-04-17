const express = require('express');
const listCourse = require('../controllers/listCourseController')
const authController = require('../controllers/authController')
const detailCourseController = require('../controllers/detailCourseController')
const router = express.Router();

router
    .get('/', listCourse.getAllCourse)
    .get('/:id', detailCourseController.getCourse)
    .patch('/:id', detailCourseController.createDetailCourse)
    .post('/create', listCourse.creatCourse)
    .delete('/delete/:id', authController.protect, listCourse.deleteCource)
    .patch('/update/:id', authController.protect, listCourse.updateCourse)

module.exports = router;