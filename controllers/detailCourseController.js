const contentCourse = require('../models/courseDetail')
const Course = require('../models/listCourse')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getCourse = catchAsync(async (req, res, next) => {
    // const course = await Course.findById(req.params.id);
    // console.log(course)
    const courseDetail = await contentCourse.findOne({courseId: req.params.id});
    console.log(courseDetail)
    res.status(200).json({
        status: 'success',
        data: courseDetail
    })

});
exports.createDetailCourse = catchAsync(async (req, res, next) => {
    const course = await contentCourse.create( req.body
    );
    if (!course) {
        return next(new AppError('No course found with that ID', 400))
    }

    res.status(200).json({
        status: 'success',
        data: course
    })

})