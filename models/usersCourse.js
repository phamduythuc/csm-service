const mongoose = require("mongoose");

const validator = require('validator')
const {Schema} = require("mongoose");
const Course = require("../models/listCourse");
const UsersCourseSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    courses: {
        type: Schema.Types.Array,
        ref: 'Course'
    }

});
UsersCourseSchema.pre('save', async function (next) {
    const Course = require('../models/listCourse')

    console.log(this.courses)
    next()

})
const UsersCourseModel = new mongoose.model('UsersCourse', UsersCourseSchema);
module.exports = UsersCourseModel