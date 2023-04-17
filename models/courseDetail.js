const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const {log} = require("nodemon/lib/utils");
const courseDetail = new mongoose.Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    will_learn: {
        type: Array
    },
    track: {
        type: Array
    },
    course: {
        type: Array

    }

})
// courseDetail.pre('save', async function(next) {
//     const Course = require('./listCourse')
//
//
//     const courses = this.course.map(async id => Course.findById(id).populate('Course'))
//     this.course = await Promise.all(courses);
//
//     next()
// })
const contentCourse = mongoose.model('courseDetail', courseDetail)

module.exports = contentCourse;