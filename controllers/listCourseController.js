const Course = require('../models/listCourse')
const catchAsync =require('../utils/catchAsync')

exports.creatCourse = catchAsync( async (req, res, next) => {
    const course = await Course.create(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    })
})

exports.getAllCourse = catchAsync(async (req, res, next) => {
    let  queryObj = {...req.query};
    const excludedField = ['limit', 'page']
    queryObj = queryObj.includes( item => delete queryObj[item])
    console.log(queryObj)
    const listCourse = await Course.find(queryObj);
    res.status(200).json({
        status: "success",
        total: listCourse.length,
        data: {
            listCourse
        },
    })
})

exports.deleteCource = catchAsync( async (req, res, next) => {
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.updateCourse = catchAsync( async (req, res , next) => {
    const updateCourse = Course.findByIdAndUpdate(req.params.id, req.body,  {
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