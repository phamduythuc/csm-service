const express = require('express');
const listCourse = require('../controllers/listCourseController')
const authController = require('../controllers/authController')
const detailCourseController = require('../controllers/detailCourseController')
const courseUser = require('../controllers/usersCourseController')
const router = express.Router();

router.route('/')
    .get(listCourse.getAllCourse)
    // .get('/:id', detailCourseController.getCourse)
    // .patch('/:id', detailCourseController.createDetailCourse)
    .post(listCourse.creatCourse)
    // .post(detailCourseController.createDetailCourse)
// .delete('/delete/:id', authController.protect, listCourse.deleteCource)
// .patch('/update/:id', authController.protect, listCourse.updateCourse)
router.post('/create', detailCourseController.createDetailCourse)
router.post('/add-course',authController.protect, courseUser.getCourseUser)
router.route('/:id')
    .get(detailCourseController.getCourse)

    .delete(authController.protect, listCourse.deleteCource)
    .patch(authController.protect, listCourse.updateCourse)
module.exports = router;