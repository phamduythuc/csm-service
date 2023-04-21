const catchAsync = require('../utils/catchAsync');
const jsonwebtoken = require("jsonwebtoken");
const AppError = require("../utils/appError");
const UserApp = require("../models/userModelApp");
const Course = require('../models/listCourse')
const CourseUser = require('../models/usersCourse')
exports.getCourseUser = catchAsync(async (req, res, next) => {
    let tokenUser;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        tokenUser = req.headers.authorization.split(' ')[1];
    }
    const {id} = jsonwebtoken.verify(tokenUser, process.env.JWT_SECRET)
    const user = await UserApp.findById(id).select('-password')
    if (!user) {
        return next(new AppError('Account does not exist', 400))
    }
    const course = await Course.findById(req.body.courses);
    if (!course) {
        return next(new AppError('Course does not exist', 400))
    }




    res.status(200).json({
        status: 'success'
    })
})

