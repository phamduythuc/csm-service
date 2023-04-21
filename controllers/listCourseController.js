const Course = require('../models/listCourse')
const CourseDetail = require('../models/courseDetail')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
exports.creatCourse = catchAsync(async (req, res, next) => {
    const course = await Course.create(req.body);
    if (!course) {
        return next(new AppError('Error creating course', 400))
    }
    // const courseDetail = new CourseDetail({
    //     courseId: course._id
    // })
    // await courseDetail.save()

    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    })
})

exports.getAllCourse = catchAsync(async (req, res, next) => {
    const listCourse = await Course.find();
    res.status(200).json({
        status: 'success',
        courses: listCourse
    })
})
exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return next(new AppError(404, 'Course not found'))
    }
    const detailCourse = course
    res.status(200).json({
        status: 'success',
        courses: detailCourse
    })

})

exports.deleteCource = catchAsync(async (req, res, next) => {
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.updateCourse = catchAsync(async (req, res, next) => {
    const updateCourse = Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            updateCourse
        }
    })
})