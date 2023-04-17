const contentCourse = require('../models/courseDetail')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await contentCourse.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: course
    })

});
exports.createDetailCourse = catchAsync(async (req, res, next) => {
    const course = await contentCourse.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
        runValidators: true
    });
    if (!course) {
        return next(new AppError('No course found with that ID', 400))
    }

    res.status(200).json({
        status: 'success',
        data: course
    })

})