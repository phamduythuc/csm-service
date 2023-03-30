const express = require('express');
const listCourse = require('../controllers/listCourseController')
const authController = require('../controllers/authController')

const router = express.Router();

router
    .get('/', authController.protect,  listCourse.getAllCourse)
    .post('/create', authController.protect, listCourse.creatCourse)
    .delete('/delete/:id',authController.protect, listCourse.deleteCource)
    .patch('/update/:id', authController.protect, listCourse.updateCourse)

module.exports = router;