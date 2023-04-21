const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const {log} = require("nodemon/lib/utils");
const Course = require('../models/listCourse')
const CourseDetail = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    will_learn: {
        type: Array
    },
    track: {
        type: Array
    },
    course:
        {
           type:Schema.Types.Array,
            ref: 'Course'
        },
    description: {
        type: String
    }

})
// CourseDetail.pre('save', async function (next) {
//     const Course = require('../models/listCourse')
//
//     const courses = this.course.map(async id => {
//         this.courseId = id
//         return Course.findById(id)
//     } )
//     this.course = await Promise.all(courses);
//     console.log(await Promise.all(courses))
//     next()
// })
const contentCourse = mongoose.model('courseDetail', CourseDetail)

module.exports = contentCourse;